import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault?: boolean;
}

const AddressSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: ''
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'nl' },
    },
    debounce: 300,
  });

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (profile?.address) {
      setSavedAddresses([
        {
          id: 'default',
          name: 'Home',
          street: profile.address,
          city: profile.city || '',
          postalCode: profile.postal_code || '',
          isDefault: true
        }
      ]);
      setSelectedAddress('default');
    } else {
      // Automatically show the new address form if no addresses exist
      setShowNewAddressForm(true);
    }
  }, [profile]);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `address-${savedAddresses.length + 1}`;
    const address: Address = {
      id: newId,
      ...newAddress
    };
    setSavedAddresses([...savedAddresses, address]);
    setSelectedAddress(newId);
    setShowNewAddressForm(false);
    clearSuggestions();
  };

  const handleSelect = async (suggestion: google.maps.places.AutocompletePrediction) => {
    setValue(suggestion.description, false);
    clearSuggestions();
    setShowSuggestions(false);

    try {
      const results = await getGeocode({ placeId: suggestion.place_id });
      const { lat, lng } = await getLatLng(results[0]);
      
      const addressComponents = results[0].address_components;
      let streetNumber = '';
      let route = '';
      let city = '';
      let postalCode = '';

      for (const component of addressComponents) {
        const types = component.types;
        if (types.includes('street_number')) {
          streetNumber = component.long_name;
        } else if (types.includes('route')) {
          route = component.long_name;
        } else if (types.includes('locality')) {
          city = component.long_name;
        } else if (types.includes('postal_code')) {
          postalCode = component.long_name;
        }
      }

      setNewAddress({
        ...newAddress,
        street: `${route} ${streetNumber}`.trim(),
        city,
        postalCode
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleContinue = () => {
    if (selectedAddress) {
      const address = savedAddresses.find(addr => addr.id === selectedAddress);
      if (address) {
        navigate('/order/schedule', {
          state: { 
            ...location.state,
            address: {
              street: address.street,
              city: address.city,
              postalCode: address.postalCode
            }
          }
        });
      }
    }
  };

  const handleBack = () => {
    navigate('/order/service', { state: location.state });
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
            Select Delivery Address
          </h1>
          <p className="text-lg text-gray-600">
            Choose where you'd like your clean laundry delivered
          </p>
        </div>

        {savedAddresses.length > 0 && !showNewAddressForm && (
          <div className="space-y-4 mb-8">
            {savedAddresses.map((address) => (
              <motion.button
                key={address.id}
                onClick={() => setSelectedAddress(address.id)}
                className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
                  selectedAddress === address.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white hover:bg-gray-50 text-gray-800 shadow hover:shadow-md'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-bold">{address.name}</h3>
                      {address.isDefault && (
                        <span className={`ml-2 text-sm ${
                          selectedAddress === address.id ? 'text-white/80' : 'text-blue-600'
                        }`}>
                          (Default)
                        </span>
                      )}
                    </div>
                    <p className={selectedAddress === address.id ? 'text-white/90' : 'text-gray-600'}>
                      {address.street}, {address.city} {address.postalCode}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {(showNewAddressForm || savedAddresses.length === 0) ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Address</h3>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Name
                </label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                  placeholder="e.g., Home, Office"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Address
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setShowSuggestions(true);
                    }}
                    disabled={!ready}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                    placeholder="Start typing your address..."
                  />
                </div>

                {status === "OK" && showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-auto"
                  >
                    {data.map((suggestion) => (
                      <div
                        key={suggestion.place_id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSelect(suggestion)}
                      >
                        <p className="text-gray-900">{suggestion.description}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                  placeholder="Enter street address"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={newAddress.postalCode}
                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                    placeholder="Enter postal code"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                {savedAddresses.length > 0 && (
                  <motion.button
                    type="button"
                    onClick={() => setShowNewAddressForm(false)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                )}
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Address
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setShowNewAddressForm(true)}
            className="w-full p-6 rounded-xl bg-gray-50 hover:bg-gray-100 text-left transition-all duration-300 flex items-center mb-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
              <Plus className="text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">Add New Address</span>
          </motion.button>
        )}

        <div className="flex justify-between items-center">
          <motion.button
            onClick={handleBack}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </motion.button>

          <motion.button
            onClick={handleContinue}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedAddress
                ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={selectedAddress ? { scale: 1.05 } : {}}
            whileTap={selectedAddress ? { scale: 0.95 } : {}}
            disabled={!selectedAddress}
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddressSelection;