import { Product, Store, SmartListTag, ProductCategory, DeliveryInfo } from '@/types';

export const storeData: Store = {
  id: '1',
  name: 'Oki Mart',
  rating: 4.6,
  reviewCount: 1000,
  isInStock: true,
  address: '16-7 Jungangsijang-ro',
  deliveryTime: '2 Hours',
  minimumOrder: 0,
};

export const deliveryInfo: DeliveryInfo = {
  isFastest: true,
  hasMinimumOrder: false,
  deliveryTime: '2 Hours',
};

export const smartListTags: SmartListTag[] = [
  {
    id: '1',
    name: 'eggs',
    icon: '●',
    color: 'text-green-500',
  },
  {
    id: '2',
    name: 'water',
    icon: '💧',
    color: 'text-blue-500',
  },
  {
    id: '3',
    name: 'milk',
    icon: '🥛',
    color: 'text-white',
  },
  {
    id: '4',
    name: 'ice cream',
    icon: '🍦',
    color: 'text-yellow-400',
  },
];

export const categories: ProductCategory[] = [
  { id: '1', name: 'Produce' },
  { id: '2', name: 'Meat' },
  { id: '3', name: 'Daily Essentials' },
];

export const products: Product[] = [
  // Produce
  {
    id: '1',
    name: 'Avocado',
    price: 5.99,
    emoji: '🥑',
    category: categories[0],
    inStock: true,
  },
  {
    id: '2',
    name: 'Lettuce',
    price: 1.99,
    category: categories[0],
    inStock: true,
  },
  {
    id: '3',
    name: 'Bananas',
    price: 0.99,
    category: categories[0],
    inStock: true,
  },
  {
    id: '9',
    name: 'Tomatoes',
    price: 2.49,
    category: categories[0],
    inStock: true,
  },
  {
    id: '10',
    name: 'Cucumber',
    price: 1.29,
    category: categories[0],
    inStock: true,
  },
  {
    id: '11',
    name: 'Onion',
    price: 0.79,
    category: categories[0],
    inStock: true,
  },
  // Meat
  {
    id: '4',
    name: 'Chicken',
    price: 8.99,
    category: categories[1],
    inStock: true,
  },
  {
    id: '5',
    name: 'Beef',
    price: 12.99,
    category: categories[1],
    inStock: true,
  },
  {
    id: '6',
    name: 'Pork',
    price: 9.99,
    category: categories[1],
    inStock: true,
  },
  {
    id: '12',
    name: 'Turkey',
    price: 10.49,
    category: categories[1],
    inStock: true,
  },
  {
    id: '13',
    name: 'Lamb',
    price: 14.99,
    category: categories[1],
    inStock: true,
  },
  // Daily Essentials
  {
    id: '7',
    name: 'Milk 1L',
    price: 3.50,
    category: categories[2],
    inStock: true,
  },
  {
    id: '8',
    name: 'Bread',
    price: 2.80,
    category: categories[2],
    inStock: true,
  },
  {
    id: '14',
    name: 'Eggs 12ct',
    price: 4.20,
    category: categories[2],
    inStock: true,
  },
  {
    id: '15',
    name: 'Butter',
    price: 3.10,
    category: categories[2],
    inStock: true,
  },
];

const normalize = (value: string): string => value.toLowerCase().trim();

export const searchProducts = (query: string): Product[] => {
  const q = normalize(query);
  if (!q) return products;

  return products.filter((product) => {
    const haystack = [
      product.name,
      product.category.name,
      product.description ?? '',
    ]
      .map(normalize)
      .join(' ');
    return haystack.includes(q);
  });
};

export const getProductsByCategory = (
  categoryId: string,
  query: string = ''
): Product[] => {
  const source = query ? searchProducts(query) : products;
  return source.filter((product) => product.category.id === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
