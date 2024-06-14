import { APP_CONFIG } from "./app.config";
import { IAPIEndpoint } from "../interfaces";

export const API_BASE_URL = APP_CONFIG.apiBaseUrl;

export const API_ENDPOINT: IAPIEndpoint = {
  product: '/api/products',
  categories: '/api/categories',
  vouchers: '/api/vouchers',
  employees: '/api/employees',
  reviews: '/api/reviews',
  roles: '/api/roles',
  bills: '/api/bills',
  customers: '/api/customers',
  feedback: '/api/feedback',
  auth: {
    base: API_BASE_URL + '/' + 'auth',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    forgotPassword: '/api/auth/forgot-password/',
    resetPassword: '/api/auth/reset-password/',
    refreshToken: '/api/auth/refresh-token/',
  },
  statistic: {
    getProductPrices: '/api/statistics/product-prices',
    getCountProducts: '/api/statistics/count-products',

  }
};
