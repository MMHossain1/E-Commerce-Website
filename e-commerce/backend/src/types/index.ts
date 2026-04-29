export interface User {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  avatar?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  image?: string;
  stock: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  paymentIntentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Review {
  _id?: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  createdAt?: Date;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthPayload {
  user: User;
  tokens: AuthTokens;
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}