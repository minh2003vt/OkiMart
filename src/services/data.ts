import { Product, Store, SmartListTag, ProductCategory, DeliveryInfo, Order, OrderItem } from '@/types';

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
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&h=400&q=80',
    category: categories[0],
    inStock: true,
    quantity: 12,
  },
  {
    id: '2',
    name: 'Lettuce',
    price: 1.99,
    category: categories[0],
    inStock: true,
    quantity: 24,
  },
  {
    id: '3',
    name: 'Bananas',
    price: 0.99,
    category: categories[0],
    inStock: true,
    quantity: 36,
  },
  {
    id: '9',
    name: 'Tomatoes',
    price: 2.49,
    category: categories[0],
    inStock: true,
    quantity: 30,
  },
  {
    id: '10',
    name: 'Cucumber',
    price: 1.29,
    category: categories[0],
    inStock: true,
    quantity: 18,
  },
  {
    id: '11',
    name: 'Onion',
    price: 0.79,
    category: categories[0],
    inStock: true,
    quantity: 40,
  },
  // Meat
  {
    id: '4',
    name: 'Chicken',
    price: 8.99,
    category: categories[1],
    inStock: true,
    quantity: 15,
  },
  {
    id: '5',
    name: 'Beef',
    price: 12.99,
    category: categories[1],
    inStock: true,
    quantity: 10,
  },
  {
    id: '6',
    name: 'Pork',
    price: 9.99,
    category: categories[1],
    inStock: true,
    quantity: 20,
  },
  {
    id: '12',
    name: 'Turkey',
    price: 10.49,
    category: categories[1],
    inStock: true,
    quantity: 8,
  },
  {
    id: '13',
    name: 'Lamb',
    price: 14.99,
    category: categories[1],
    inStock: true,
    quantity: 6,
  },
  // Daily Essentials
  {
    id: '7',
    name: 'Milk 1L',
    price: 3.50,
    category: categories[2],
    inStock: true,
    quantity: 50,
  },
  {
    id: '8',
    name: 'Bread',
    price: 2.80,
    category: categories[2],
    inStock: true,
    quantity: 40,
  },
  {
    id: '14',
    name: 'Eggs 12ct',
    price: 4.20,
    category: categories[2],
    inStock: true,
    quantity: 22,
  },
  {
    id: '15',
    name: 'Butter',
    price: 3.10,
    category: categories[2],
    inStock: true,
    quantity: 28,
  },
];

// Orders in-memory store for this demo
export const orders: Order[] = [];

const generateId = (): string => Math.random().toString(36).slice(2, 10);

export const canAddProductToCart = (product: Product, currentQtyInCart: number, addQty: number = 1): boolean => {
  const max = Math.max(0, product.quantity ?? 0);
  return currentQtyInCart + addQty <= max && max > 0;
};

export interface CheckoutResult {
  order: Order;
}

export const checkout = (items: { product: Product; quantity: number }[]): CheckoutResult => {
  // Validate: no zero-qty products and not exceeding stock
  for (const { product, quantity } of items) {
    const available = Math.max(0, product.quantity ?? 0);
    if (available === 0) {
      throw new Error(`Product ${product.name} is out of stock.`);
    }
    if (quantity <= 0) {
      throw new Error(`Invalid quantity for ${product.name}.`);
    }
    if (quantity > available) {
      throw new Error(`Quantity for ${product.name} exceeds available stock.`);
    }
  }

  // Build order line items
  const orderItems: OrderItem[] = items.map(({ product, quantity }) => ({
    product: { ...product },
    quantity,
    lineTotal: product.price * quantity,
  }));
  const total = orderItems.reduce((acc, it) => acc + it.lineTotal, 0);
  const order: Order = {
    id: generateId(),
    items: orderItems,
    total,
    createdAt: new Date().toISOString(),
  };

  // Decrease product stock (never below zero)
  for (const { product, quantity } of items) {
    const idx = products.findIndex((p) => p.id === product.id);
    if (idx !== -1) {
      const available = Math.max(0, products[idx].quantity ?? 0);
      const next = available - quantity;
      products[idx].quantity = next < 0 ? 0 : next;
      products[idx].inStock = products[idx].quantity > 0;
    }
  }

  // Save order
  orders.push(order);

  return { order };
};

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
