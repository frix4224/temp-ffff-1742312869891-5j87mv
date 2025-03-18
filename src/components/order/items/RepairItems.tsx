import React from 'react';
import { Scissors } from 'lucide-react';
import BaseItemSelection, { Item, Category, ServiceInfo } from './BaseItemSelection';

const serviceInfo: ServiceInfo = {
  id: 'repairs',
  name: 'Repairs & Alterations',
  icon: Scissors,
  color: 'bg-amber-600',
  lightColor: 'bg-amber-50',
  description: 'Expert mending and alterations services',
  features: [
    'Professional tailoring',
    'Quality materials used',
    'Precise measurements',
    'Satisfaction guaranteed',
    'Free consultation available'
  ]
};

const categories: Category[] = [
  { id: 'basic', name: 'Basic Repairs', description: 'Simple fixes and alterations' },
  { id: 'advanced', name: 'Advanced Repairs', description: 'Complex repairs and modifications' },
  { id: 'alterations', name: 'Alterations', description: 'Size and fit adjustments' }
];

const items: Item[] = [
  // Basic Repairs
  { id: 'button', name: 'Button Replacement', price: 3.99, description: 'Replace missing buttons', categoryId: 'basic', popular: true },
  { id: 'hem_basic', name: 'Simple Hem', price: 6.99, description: 'Basic hem adjustment', categoryId: 'basic', popular: true },
  { id: 'patch', name: 'Small Patch', price: 'custom', description: 'Small tear repair', categoryId: 'basic' },
  { id: 'seam', name: 'Seam Repair', price: 5.99, description: 'Fix loose seams', categoryId: 'basic' },

  // Advanced Repairs
  { id: 'zipper', name: 'Zipper Replacement', price: 12.99, description: 'Full zipper replacement', categoryId: 'advanced', popular: true },
  { id: 'lining', name: 'Lining Repair', price: 'custom', description: 'Fix or replace lining', categoryId: 'advanced' },
  { id: 'leather_repair', name: 'Leather Repair', price: 'custom', description: 'Professional leather fixing', categoryId: 'advanced' },

  // Alterations
  { id: 'waist', name: 'Waist Adjustment', price: 9.99, description: 'Take in or let out waist', categoryId: 'alterations', popular: true },
  { id: 'length', name: 'Length Adjustment', price: 8.99, description: 'Shorten or lengthen', categoryId: 'alterations' },
  { id: 'shoulders', name: 'Shoulder Adjustment', price: 'custom', description: 'Adjust shoulder fit', categoryId: 'alterations' }
];

const RepairItems: React.FC = () => {
  return (
    <BaseItemSelection
      service="repairs"
      serviceInfo={serviceInfo}
      categories={categories}
      items={items}
    />
  );
};

export default RepairItems;