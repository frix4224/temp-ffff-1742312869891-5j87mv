import React from 'react';
import { Package } from 'lucide-react';
import BaseItemSelection, { Item, Category, ServiceInfo } from './BaseItemSelection';

const serviceInfo: ServiceInfo = {
  id: 'easy-bag',
  name: 'Eazyy Bag',
  icon: Package,
  color: 'bg-blue-600',
  lightColor: 'bg-blue-50',
  description: 'Weight-based washing service for regular laundry',
  features: [
    'Pay by weight',
    'Mixed items welcome',
    'Sorted by color',
    'Folded and organized'
  ]
};

const categories: Category[] = [
  { id: 'bags', name: 'Laundry Bags', description: 'Choose your bag size' }
];

const items: Item[] = [
  { id: 'small_bag', name: 'Small Bag (up to 6kg)', price: 24.99, description: 'Perfect for singles or couples', categoryId: 'bags', popular: true },
  { id: 'medium_bag', name: 'Medium Bag (up to 12kg)', price: 44.99, description: 'Ideal for families', categoryId: 'bags', popular: true },
  { id: 'large_bag', name: 'Large Bag (up to 18kg)', price: 59.99, description: 'Best value for large loads', categoryId: 'bags' }
];

const EazyBagItems: React.FC = () => {
  return (
    <BaseItemSelection
      service="easy-bag"
      serviceInfo={serviceInfo}
      categories={categories}
      items={items}
    />
  );
};

export default EazyBagItems;