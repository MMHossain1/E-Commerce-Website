import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });

          const { access, refresh } = response.data.tokens;
          Cookies.set('access_token', access, { expires: 1 / 1440 });
          Cookies.set('refresh_token', refresh, { expires: 1 });

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

export const authAPI = {
  register: (data: { username: string; email: string; password: string; firstName?: string; lastName?: string }) =>
    api.post('/auth/register', data),

  login: (data: { username: string; password: string }) =>
    api.post('/auth/login', data),

  google: (credential: string) =>
    api.post('/auth/google', { credential }),

  me: () =>
    api.get('/auth/me'),

  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    api.post('/auth/change-password', data),

  updateProfile: (data: any) =>
    api.put('/auth/profile', data),
};

export const productsAPI = {
  getAll: (params?: { category?: string; search?: string; page?: number }) =>
    api.get('/products', { params }),

  getOne: (id: string) =>
    api.get(`/products/${id}`),

  getFeatured: () =>
    api.get('/products/featured'),

  getCategories: () =>
    api.get('/categories'),

  getCategoryProducts: (slug: string) =>
    api.get(`/categories/${slug}`),
};

export const ordersAPI = {
  create: (data: any) =>
    api.post('/orders', data),

  createPaymentIntent: (data: { amount: number; orderId: string }) =>
    api.post('/orders/payment/intent', data),

  updatePaymentStatus: (data: { orderId: string; paymentIntentId: string; status: string }) =>
    api.post('/orders/payment/status', data),

  getAll: () =>
    api.get('/orders'),

  getOne: (id: string) =>
    api.get(`/orders/${id}`),
};

export const aiAPI = {
  chat: (message: string, context?: any) =>
    api.post('/ai/chat', { message, context }),

  getRecommendations: (params?: { productId?: string; category?: string }) =>
    api.get('/ai/recommendations', { params }),

  getCheckoutGuidance: (cartItems: any[]) =>
    api.post('/ai/checkout-guidance', { cartItems }),
};