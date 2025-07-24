export interface PayPalOrder {
    id: string;
    status: string;
    amount: number;
    currency: string;
    approvalUrl?: string;
  }
  
  export interface CreateOrderRequest {
    amount: number;
    currency: string;
    description?: string;
    items?: OrderItem[];
  }
  
  export interface OrderItem {
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface PayPalTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
  }
  
  export interface PayPalOrderResponse {
    id: string;
    status: string;
    links: Array<{
      href: string;
      rel: string;
      method: string;
    }>;
  }
  
  export interface PayPalButtonProps {
    amount: number;
    currency?: string;
    description?: string;
    items?: OrderItem[];
    onSuccess?: (order: any) => void;
    onError?: (error: any) => void;
    onCancel?: () => void;
  }