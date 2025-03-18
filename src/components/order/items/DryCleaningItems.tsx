import React from 'react';
import { Wind } from 'lucide-react';
import BaseItemSelection, { Item, Category, ServiceInfo } from './BaseItemSelection';

const serviceInfo: ServiceInfo = {
  id: 'dry-cleaning',
  name: 'Dry Cleaning',
  icon: Wind,
  color: 'bg-emerald-600',
  lightColor: 'bg-emerald-50',
  description: 'Professional dry cleaning for delicate items',
  features: [
    'Gentle dry cleaning process',
    'Safe for delicate fabrics',
    'Stain removal expertise',
    'Preserves fabric quality',
    'Special care instructions followed'
  ]
};

const categories: Category[] = [
  { id: 'formal', name: 'Formal Wear', description: 'Suits and formal attire' },
  { id: 'delicate', name: 'Delicate Items', description: 'Silk and wool garments' },
  { id: 'outerwear', name: 'Outerwear', description: 'Coats and jackets' }
];

const items: Item[] = [
  // Formal Wear
  { id: 'suit', name: 'Suit (2-piece)', price: 19.99, description: 'Complete suit cleaning', categoryId: 'formal', popular: true },
  { id: 'blazer', name: 'Blazer', price: 12.99, description: 'Single blazer or jacket', categoryId: 'formal' },
  { id: 'formal_dress', name: 'Formal Dress', price: 15.99, description: 'Evening or formal dresses', categoryId: 'formal' },
  { id: 'tuxedo', name: 'Tuxedo', price: 24.99, description: 'Full tuxedo cleaning', categoryId: 'formal' },

  // Delicate Items
  { id: 'silk_blouse', name: 'Silk Blouse', price: 9.99, description: 'Delicate silk tops', categoryId: 'delicate' },
  { id: 'wool_sweater', name: 'Wool Sweater', price: 11.99, description: 'Wool or cashmere sweaters', categoryId: 'delicate', popular: true },
  { id: 'silk_dress', name: 'Silk Dress', price: 14.99, description: 'Silk dresses', categoryId: 'delicate' },
  { id: 'cashmere', name: 'Cashmere Item', price: 13.99, description: 'Cashmere garments', categoryId: 'delicate' },

  // Outerwear
  { id: 'winter_coat', name: 'Winter Coat', price: 19.99, description: 'Heavy winter coats', categoryId: 'outerwear', popular: true },
  { id: 'leather_jacket', name: 'Leather Jacket', price: 24.99, description: 'Leather care', categoryId: 'outerwear' },
  { id: 'wool_coat', name: 'Wool Coat', price: 17.99, description: 'Wool coats', categoryId: 'outerwear' }
];

const DryCleaningItems: React.FC = () => {
  return (
    <BaseItemSelection
      service="dry-cleaning"
      serviceInfo={serviceInfo}
      categories={categories}
      items={items}
    />
  );
};

export default DryCleaningItems;