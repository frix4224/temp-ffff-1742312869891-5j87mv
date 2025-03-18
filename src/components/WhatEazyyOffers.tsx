import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Package, Shirt, Wind, Scissors, ChevronRight, ChevronLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 'easy-bag',
    name: 'Eazyy Bag',
    icon: Package,
    description: 'Weight-based washing perfect for regular laundry',
    items: [
      { id: 'shirts', name: 'Shirts', price: 2.99 },
      { id: 'pants', name: 'Pants', price: 3.99 },
      { id: 'tshirts', name: 'T-Shirts', price: 1.99 },
      { id: 'dresses', name: 'Dresses', price: 4.99 },
      { id: 'bedding', name: 'Bedding', price: 7.99 }
    ],
    estimatedTime: 24,
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50'
  },
  {
    id: 'wash-iron',
    name: 'Wash & Iron',
    icon: Shirt,
    description: 'Professional cleaning and pressing for individual items',
    items: [
      { id: 'shirts_iron', name: 'Shirts', price: 4.99 },
      { id: 'pants_iron', name: 'Pants', price: 5.99 },
      { id: 'dresses_iron', name: 'Dresses', price: 7.99 },
      { id: 'suits_iron', name: 'Suits', price: 12.99 },
      { id: 'blouses_iron', name: 'Blouses', price: 6.99 }
    ],
    estimatedTime: 24,
    color: 'bg-purple-600',
    lightColor: 'bg-purple-50'
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    icon: Wind,
    description: 'Specialized cleaning for delicate garments',
    items: [
      { id: 'suits_dry', name: 'Suits', price: 15.99 },
      { id: 'dresses_dry', name: 'Formal Dresses', price: 14.99 },
      { id: 'coats_dry', name: 'Coats', price: 19.99 },
      { id: 'silk_dry', name: 'Silk Items', price: 9.99 },
      { id: 'cashmere_dry', name: 'Cashmere', price: 12.99 }
    ],
    estimatedTime: 24,
    color: 'bg-emerald-600',
    lightColor: 'bg-emerald-50'
  },
  {
    id: 'repairs',
    name: 'Repairs',
    icon: Scissors,
    description: 'Expert mending and alterations services',
    items: [
      { id: 'button_repair', name: 'Button Replacement', price: 3.99 },
      { id: 'zipper_repair', name: 'Zipper Repair', price: 8.99 },
      { id: 'hem_repair', name: 'Hem Adjustment', price: 7.99 },
      { id: 'patch_repair', name: 'Patch Work', price: 9.99 },
      { id: 'seam_repair', name: 'Seam Repair', price: 6.99 }
    ],
    estimatedTime: 24,
    color: 'bg-amber-600',
    lightColor: 'bg-amber-50'
  }
];

const WhatEazyyOffers: React.FC = () => {
  const [activeService, setActiveService] = useState<number>(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      setActiveService((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    } else if (isRightSwipe) {
      setActiveService((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    }
  };

  return (
    <section 
      id="services" 
      ref={ref}
      className="py-12 sm:py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            What Eazyy Offers
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our premium laundry services tailored to your needs
          </p>
        </motion.div>
        
        {/* Mobile View */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl flex items-center mr-3 transition-all duration-300 ${
                  activeService === index 
                    ? service.color + ' text-white' 
                    : 'bg-white text-gray-700'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {React.createElement(service.icon, { 
                  className: `w-5 h-5 ${activeService === index ? 'text-white' : ''}` 
                })}
                <span className="ml-2 whitespace-nowrap font-medium">
                  {service.name}
                </span>
              </motion.button>
            ))}
          </div>
          
          <div 
            className="relative overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-xl ${services[activeService].color} flex items-center justify-center text-white mb-4`}>
                    {React.createElement(services[activeService].icon, { size: 28 })}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {services[activeService].name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-base">
                    {services[activeService].description}
                  </p>
                  
                  <div className="space-y-3">
                    {services[activeService].items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-800">{item.name}</span>
                        <span className="text-gray-600">€{item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Estimated Time:</span>
                      <span className="font-medium text-gray-800">{services[activeService].estimatedTime} hours</span>
                    </div>
                    
                    <motion.button
                      onClick={() => navigate('/order/service')}
                      className={`w-full py-3 px-6 rounded-xl ${services[activeService].color} text-white font-medium flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300`}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Your Order
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6 px-4">
            <motion.button
              onClick={() => setActiveService((prev) => (prev === 0 ? services.length - 1 : prev - 1))}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-2">
              {services.map((service, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`w-2 h-2 rounded-full ${
                    activeService === index ? service.color : 'bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => setActiveService((prev) => (prev === services.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="col-span-2">
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
                    activeService === index 
                      ? `${service.color} text-white shadow-lg` 
                      : 'bg-white hover:bg-gray-50 text-gray-800 shadow hover:shadow-md'
                  }`}
                  onClick={() => setActiveService(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-3">
                    <div className={`w-12 h-12 rounded-lg ${
                      activeService === index ? 'bg-white/20' : service.color
                    } flex items-center justify-center`}>
                      {React.createElement(service.icon, { 
                        size: 24,
                        className: 'text-white'
                      })}
                    </div>
                    <h3 className="ml-4 text-xl font-bold">{service.name}</h3>
                  </div>
                  <p className={activeService === index ? 'text-white/90' : 'text-gray-600'}>
                    {service.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl h-full p-8"
              >
                <div className="mb-8">
                  <div className={`w-16 h-16 rounded-xl ${services[activeService].color} flex items-center justify-center text-white mb-6`}>
                    {React.createElement(services[activeService].icon, { size: 32 })}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {services[activeService].name}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {services[activeService].description}
                  </p>
                </div>

                <div className="space-y-4">
                  {services[activeService].items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-800 text-lg">{item.name}</span>
                      <span className="text-lg font-medium text-gray-900">€{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 text-lg">Estimated Time:</span>
                    <span className="font-medium text-gray-800 text-lg">{services[activeService].estimatedTime} hours</span>
                  </div>

                  <motion.button
                    onClick={() => navigate('/order/service')}
                    className={`w-full py-4 px-6 rounded-xl ${services[activeService].color} text-white font-medium flex items-center justify-center text-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Your Order
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatEazyyOffers;