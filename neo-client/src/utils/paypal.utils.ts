import { CreateOrderRequest, OrderItem } from "@/shared/types/order.interface";

export const formatPayPalAmount = (amount: number): string => {
    return amount.toFixed(2);
  };
  
  export const calculateTotal = (items: OrderItem[]): number => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  export const validateOrderData = (orderData: CreateOrderRequest): boolean => {
    return orderData.amount > 0 && orderData.currency.length === 3;
  };