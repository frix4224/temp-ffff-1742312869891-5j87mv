import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, Shirt, Wind, Scissors, ArrowRight, ArrowLeft } from 'lucide-react';

const services = [
  {
    id: 'easy-bag',
    name: 'Eazyy Bag',
    icon: Package,
    description: 'Weight-based washing perfect for regular laundry',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50'
  },
  {
    id: 'wash-iron',
    name: 'Wash & Iron',
    icon: Shirt,
    description: 'Professional cleaning and pressing for individual items',
    color: 'bg-purple-600',
    lightColor: 'bg-purple-50'
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    icon: Wind,
    description: 'Specialized cleaning for delicate garments',
    color: 'bg-emerald-600',
    lightColor: 'bg-emerald-50'
  },
  {
    id: 'repairs',
    name: 'Repairs',
    icon: Scissors,
    description: 'Expert mending and alterations services',
    color: 'bg-amber-600',
    lightColor: 'bg-amber-50'
  }
];

const ServiceSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    // Navigate to the service-specific items page
    setTimeout(() => {
      navigate(`/order/items/${serviceId}`);
    }, 300);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose a Service
          </h1>
          <p className="text-lg text-gray-600">
            Select the service that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => handleServiceSelect(service.id)}
              className={`w-full p-6 rounded-2xl text-left transition-all duration-300 ${
                selectedService === service.id
                  ? `${service.color} text-white shadow-lg`
                  : `${service.lightColor} hover:scale-[1.02] text-gray-900 shadow-md hover:shadow-lg`
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-xl ${
                  selectedService === service.id ? 'bg-white/20' : service.color
                } flex items-center justify-center`}>
                  {React.createElement(service.icon, {
                    size: 24,
                    className: selectedService === service.id ? 'text-white' : 'text-white'
                  })}
                </div>
                <h3 className="ml-4 text-xl font-bold">{service.name}</h3>
              </div>
              <p className={`text-base ${
                selectedService === service.id ? 'text-white/90' : 'text-gray-600'
              }`}>
                {service.description}
              </p>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 flex justify-between">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </motion.button>

          <motion.button
            onClick={() => selectedService && navigate(`/order/items/${selectedService}`)}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedService
                ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={selectedService ? { scale: 1.05 } : {}}
            whileTap={selectedService ? { scale: 0.95 } : {}}
            disabled={!selectedService}
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceSelection;