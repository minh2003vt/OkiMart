export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  emoji?: string;
  category: ProductCategory;
  inStock: boolean;
  description?: string;
  quantity: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon?: string;
}

export interface Store {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  isInStock: boolean;
  address: string;
  logo?: string;
  deliveryTime: string;
  minimumOrder?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: Product; // snapshot at time of purchase
  quantity: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: string; // ISO string
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface SmartListTag {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  isActive?: boolean;
}

export interface DeliveryInfo {
  isFastest: boolean;
  hasMinimumOrder: boolean;
  deliveryTime: string;
}

export type Page = 'home' | 'orders' | 'profile';
