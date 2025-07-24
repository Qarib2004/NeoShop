import axios from 'axios'

const API_URL = process.env.APP_URL

export const OrderService = {
	async createOrder(data: any) {
		return axios.post(`${API_URL}/orders`, data)
	},

	async getOrder(id: string) {
		return axios.get(`${API_URL}/orders/${id}`)
	},

	async getUserOrders() {
		return axios.get(`${API_URL}/orders`)
	},

	async createPayPalPayment(orderId: string) {
		return axios.post(`${API_URL}/orders/${orderId}/paypal/create`)
	},

	async capturePayPalPayment(orderId: string) {
		return axios.post(`${API_URL}/orders/${orderId}/paypal/capture`)
	}
}
