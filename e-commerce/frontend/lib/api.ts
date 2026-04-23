import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = Cookies.get('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh/`, {
            refresh_token: refreshToken,
          });
          
          const { access, refresh } = response.data.tokens;
          Cookies.set('access_token', access, { expires: 1/1440 }); // 1 minute
          Cookies.set('refresh_token', refresh, { expires: 1 });
          
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/auth/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string; password_confirm: string; first_name?: string; last_name?: string }) =>
    api.post('/auth/register/', data),
  
  login: (data: { username: string; password: string }) =>
    api.post('/auth/login/', data),
  
  google: (token: string) =>
    api.post('/auth/google/', { token }),
  
  logout: (refreshToken: string) =>
    api.post('/auth/logout/', { refresh_token: refreshToken }),
  
  me: () =>
    api.get('/auth/me/'),
  
  changePassword: (data: { old_password: string; new_password: string }) =>
    api.post('/auth/change_password/', data),
  
  updateProfile: (data: any) =>
    api.put('/auth/profile/', data),
};

// Products API
export const productsAPI = {
  getAll: (params?: { category?: string; search?: string; page?: number }) =>
    api.get('/products/', { params }),
  
  getOne: (id: number) =>
    api.get(`/products/${id}/`),
  
  getFeatured: () =>
    api.get('/products/featured/'),
  
  getCategories: () =>
    api.get('/categories/'),
  
  getCategoryProducts: (slug: string) =>
    api.get(`/categories/${slug}/products/`),
};

// Orders API
export const ordersAPI = {
  create: (data: any) =>
    api.post('/orders/', data),
  
  getAll: () =>
    api.get('/orders/'),
  
  getOne: (id: number) =>
    api.get(`/orders/${id}/`),
};

// Payments API
export const paymentsAPI = {
  createPaymentIntent: (data: { amount: number; currency?: string; metadata?: any }) =>
    api.post('/payments/create_payment_intent/', data),
  
  createCheckoutSession: (data: { line_items: any[]; success_url: string; cancel_url: string; customer_email?: string }) =>
    api.post('/payments/create_checkout_session/', data),
  
  getPaymentMethods: () =>
    api.get('/payments/payment_methods/'),
  
  attachPaymentMethod: (paymentMethodId: string) =>
    api.post('/payments/attach_payment_method/', { payment_method_id: paymentMethodId }),
};

// AI Assistant API
export const aiAPI = {
  chat: (message: string, context?: any) =>
    api.post('/ai/chat/', { message, context }),
  
  recommend: (data?: { product_id?: number; category?: string; preferences?: any }) =>
    api.post('/ai/recommend/', data || {}),
  
  checkoutGuidance: (cartItems: any[], userPreferences?: any) =>
    api.post('/ai/checkout_guidance/', { cart_items: cartItems, user_preferences: userPreferences || {} }),
  
  searchAssist: (query: string, category?: string) =>
    api.get('/ai/search_assist/', { params: { q: query, category } }),
};