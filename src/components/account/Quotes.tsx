import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, CheckCircle2, X, ArrowRight, Camera, FileText } from 'lucide-react';
import AccountLayout from './AccountLayout';

interface Quote {
  id: string;
  itemName: string;
  description: string;
  status: 'pending' | 'quoted' | 'accepted' | 'declined';
  requestDate: string;
  quoteAmount?: number;
  images: string[];
  urgency: 'standard' | 'express';
  expiryDate?: string;
}

const Quotes: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const quotes: Quote[] = [
    {
      id: 'QTE-2024-001',
      itemName: 'Silk Dress',
      description: 'Red wine stain on silk dress, needs special treatment',
      status: 'quoted',
      requestDate: '2024-03-15',
      quoteAmount: 29.99,
      images: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&q=80'
      ],
      urgency: 'standard',
      expiryDate: '2024-03-17'
    },
    {
      id: 'QTE-2024-002',
      itemName: 'Leather Jacket',
      description: 'Vintage leather jacket repair',
      status: 'pending',
      requestDate: '2024-03-16',
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80'
      ],
      urgency: 'express'
    },
    {
      id: 'QTE-2024-003',
      itemName: 'Wedding Dress',
      description: 'Pre-wedding cleaning and preservation',
      status: 'accepted',
      requestDate: '2024-03-14',
      quoteAmount: 149.99,
      images: [
        'https://images.unsplash.com/photo-1594552072238-48c445af1d58?auto=format&fit=crop&w=300&q=80'
      ],
      urgency: 'standard',
      expiryDate: '2024-03-16'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'quoted':
        return 'bg-blue-100 text-blue-700';
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'declined':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'quoted':
        return FileText;
      case 'accepted':
        return CheckCircle2;
      case 'declined':
        return X;
      default:
        return Clock;
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || quote.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <AccountLayout activeTab="quotes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Quotes</h2>
            <p className="text-gray-600">View and manage your custom price quotes</p>
          </div>
          
          <motion.button
            onClick={() => navigate('/order/custom-quote')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="w-5 h-5 mr-2" />
            Request New Quote
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search quotes..."
              className="w-full sm:w-80 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </motion.button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-gray-50 rounded-xl p-4"
            >
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'quoted', 'accepted', 'declined'].map((filter) => (
                  <motion.button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl capitalize ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quotes List */}
        <div className="space-y-4">
          {filteredQuotes.map((quote) => {
            const StatusIcon = getStatusIcon(quote.status);
            return (
              <motion.div
                key={quote.id}
                className="bg-white rounded-xl shadow-lg p-6"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Image */}
                  <div className="w-full sm:w-48 h-48 rounded-lg overflow-hidden bg-gray-100">
                    {quote.images[0] ? (
                      <img
                        src={quote.images[0]}
                        alt={quote.itemName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">{quote.itemName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(quote.status)}`}>
                            {quote.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            quote.urgency === 'express' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {quote.urgency}
                          </span>
                        </div>
                        <p className="text-gray-600">{quote.description}</p>
                      </div>
                      {quote.quoteAmount && (
                        <div className="mt-4 sm:mt-0 text-right">
                          <div className="text-sm text-gray-600">Quote Amount</div>
                          <div className="text-2xl font-bold text-gray-900">
                            €{quote.quoteAmount.toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Request ID:</span> {quote.id}
                      </div>
                      <div>
                        <span className="font-medium">Requested:</span> {new Date(quote.requestDate).toLocaleDateString()}
                      </div>
                      {quote.expiryDate && (
                        <div>
                          <span className="font-medium">Valid until:</span> {new Date(quote.expiryDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {quote.status === 'quoted' && (
                      <div className="mt-6 flex flex-wrap gap-4">
                        <motion.button
                          onClick={() => navigate(`/order/accept-quote/${quote.id}`)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Accept Quote
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.button>
                        <motion.button
                          onClick={() => navigate(`/order/decline-quote/${quote.id}`)}
                          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Decline
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {filteredQuotes.length === 0 && (
            <div className="text-center py-12">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Quotes Found</h3>
              <p className="text-gray-600">
                {searchTerm || activeFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Request a quote for your special items'}
              </p>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default Quotes;