import React from 'react';
import { Shirt } from 'lucide-react';
import BaseItemSelection, { Item, Category, ServiceInfo } from './BaseItemSelection';

const serviceInfo: ServiceInfo = {
  id: 'wash-iron',
  name: 'Wash & Iron',
  icon: Shirt,
  color: 'bg-purple-600',
  lightColor: 'bg-purple-50',
  description: 'Professional washing and ironing service',
  features: [
    'Expert washing and ironing',
    'Stain treatment included',
    'Precise temperature control',
    'Garment inspection',
    'Quality check before delivery'
  ]
};

const categories: Category[] = [
  { id: 'tops', name: 'Tops', description: 'Shirts, t-shirts, and blouses' },
  { id: 'bottoms', name: 'Bottoms', description: 'Pants, shorts, and skirts' },
  { id: 'dresses', name: 'Dresses', description: 'Dresses and jumpsuits' },
  { id: 'outerwear', name: 'Outerwear', description: 'Jackets and coats' }
];

const items: Item[] = [
  // Tops
  { id: 'shirt', name: 'Shirt', price: 4.99, description: 'Business or casual shirts', categoryId: 'tops', popular: true },
  { id: 'tshirt', name: 'T-Shirt', price: 3.99, description: 'Cotton t-shirts', categoryId: 'tops', popular: true },
  { id: 'polo', name: 'Polo Shirt', price: 4.49, description: 'Polo or golf shirts', categoryId: 'tops' },
  { id: 'blouse', name: 'Blouse', price: 5.99, description: 'Women\'s blouses', categoryId: 'tops' },
  
  // Bottoms
  { id: 'pants', name: 'Pants', price: 5.99, description: 'Regular or dress pants', categoryId: 'bottoms', popular: true },
  { id: 'jeans', name: 'Jeans', price: 6.99, description: 'Denim jeans', categoryId: 'bottoms', popular: true },
  { id: 'shorts', name: 'Shorts', price: 4.99, description: 'Casual shorts', categoryId: 'bottoms' },
  { id: 'skirt', name: 'Skirt', price: 5.99, description: 'Regular or pleated skirts', categoryId: 'bottoms' },
  
  // Dresses
  { id: 'casual_dress', name: 'Casual Dress', price: 8.99, description: 'Everyday dresses', categoryId: 'dresses' },
  { id: 'maxi_dress', name: 'Maxi Dress', price: 9.99, description: 'Full-length dresses', categoryId: 'dresses' },
  
  // Outerwear
  { id: 'light_jacket', name: 'Light Jacket', price: 7.99, description: 'Spring/fall jackets', categoryId: 'outerwear' },
  { id: 'sweater', name: 'Sweater', price: 6.99, description: 'Knit sweaters', categoryId: 'outerwear' }
];

const WashAndIronItems: React.FC = () => {
  return (
    <BaseItemSelection
      service="wash-iron"
      serviceInfo={serviceInfo}
      categories={categories}
      items={items}
    />
  );
};

export default WashAndIronItems;