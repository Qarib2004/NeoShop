export const PAYPAL_INTENT = 'CAPTURE';
export const PAYPAL_LANDING_PAGE = 'BILLING';
export const PAYPAL_USER_ACTION = 'PAY_NOW';

export const PAYPAL_ENDPOINTS = {
  TOKEN: '/v1/oauth2/token',
  ORDERS: '/v2/checkout/orders',
  CAPTURE: (orderId: string) => `/v2/checkout/orders/${orderId}/capture`,
  ORDER_DETAILS: (orderId: string) => `/v2/checkout/orders/${orderId}`,
} as const;

export const PAYPAL_ERRORS = {
  TOKEN_FAILED: 'Failed to get PayPal access token',
  ORDER_CREATE_FAILED: 'Failed to create PayPal order',
  ORDER_CAPTURE_FAILED: 'Failed to capture PayPal order',
  ORDER_DETAILS_FAILED: 'Failed to get PayPal order details',
} as const;