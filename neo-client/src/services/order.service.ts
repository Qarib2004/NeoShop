import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.config'

class OrderService {
  async createOrder(data: any) {
    const { data: createdOrder } = await axiosWithAuth({
      url: API_URL.orders(),
      method: 'POST',
      data
    })
    return createdOrder
  }

  async getOrder(id: string) {
    const { data: order } = await axiosWithAuth({
      url: API_URL.orders(`/${id}`),
      method: 'GET'
    })
    return order
  }

  async getUserOrders() {
    const { data: orders } = await axiosWithAuth({
      url: API_URL.orders(),
      method: 'GET'
    })
    return orders
  }

  async createStripePayment(orderId: string) {
    const { data: payment } = await axiosWithAuth({
      url: API_URL.orders(`/${orderId}/stripe/create`),
      method: 'POST'
    })
    return payment
  }
}

export const orderService = new OrderService()
