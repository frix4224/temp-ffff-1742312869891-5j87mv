import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Package, Calendar, MapPin, Clock, CreditCard, ArrowLeft, Printer } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  service: string;
  items: { [key: string]: OrderItem };
  pickup_date: string;
  delivery_date: string;
  pickup_address: string;
  delivery_address: string;
  pickup_notes?: string;
  delivery_notes?: string;
}

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber] = useState(`EZY${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`);
  
  const orderDetails = location.state as OrderDetails;

  const subtotal = Object.values(orderDetails?.items || {}).reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  const tax = subtotal * 0.21; // 21% VAT
  const shippingFee = 0; // Free shipping
  const totalAmount = subtotal + tax + shippingFee;

  useEffect(() => {
    if (orderDetails && user && !orderSaved) {
      saveOrder();
    }
  }, [orderDetails, user]);

  const saveOrder = async () => {
    if (!user || !orderDetails || !profile) return;

    try {
      // Insert order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: user.id,
          customer_name: `${profile.first_name} ${profile.last_name}`,
          email: user.email,
          phone: profile.phone,
          shipping_address: orderDetails.delivery_address,
          shipping_method: 'standard',
          estimated_delivery: new Date(orderDetails.delivery_date),
          special_instructions: orderDetails.delivery_notes,
          subtotal,
          tax,
          shipping_fee: shippingFee,
          total_amount: totalAmount
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = Object.values(orderDetails.items).map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setOrderSaved(true);
    } catch (err) {
      console.error('Error saving order:', err);
      setError('Failed to save order. Please try again.');
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'EUR',
          description: `Order #${orderNumber}`,
          redirectUrl: `${window.location.origin}/payment/success`,
          webhookUrl: `${window.location.origin}/api/webhooks/mollie`,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment creation failed');
      }

      const { checkoutUrl } = await response.json();
      
      // Update order with payment initiated status
      await supabase
        .from('orders')
        .update({ 
          payment_status: 'pending',
          payment_method: 'mollie' 
        })
        .eq('order_number', orderNumber);

      // Redirect to payment page
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/order/schedule');
  };

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-red-700 mb-4">
              Error Processing Order
            </h2>
            <p className="text-red-600 mb-6">{error}</p>
            <motion.button
              onClick={handleBack}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go Back
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto"
      >
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Your order #{orderNumber} has been successfully placed
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Pickup Date</span>
              </div>
              <span className="font-medium text-gray-900">
                {new Date(orderDetails?.pickup_date).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Delivery Date</span>
              </div>
              <span className="font-medium text-gray-900">
                {new Date(orderDetails?.delivery_date).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Pickup Address</span>
              </div>
              <span className="font-medium text-gray-900">{orderDetails?.pickup_address}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Delivery Address</span>
              </div>
              <span className="font-medium text-gray-900">{orderDetails?.delivery_address}</span>
            </div>

            <div className="flex justify-between items-center py-3">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Total Items</span>
              </div>
              <span className="font-medium text-gray-900">
                {Object.values(orderDetails?.items || {}).reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (21%)</span>
                  <span>€{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">€{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.button
            onClick={() => window.print()}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Printer className="w-5 h-5 mr-2" />
            Print Receipt
          </motion.button>

          <motion.button
            onClick={handlePayment}
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            {loading ? 'Processing...' : 'Pay Now'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;