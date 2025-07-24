import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { ICategory, ICategoryInput } from '@/shared/types/category.interface'

class CategoryService {
	async getAll() {
		const { data } = await axiosClassic<ICategory[]>({
			url: API_URL.categories(),
			method: 'GET'
		})

		return data
	}

	async getStoredById(id: string) {
		const { data } = await axiosWithAuth<ICategory[]>({
			url: API_URL.categories(`/by-storeId/${id}`),
			method: 'GET'
		})

		return data
	}

	async create(data: ICategoryInput, storeId: string) {
		const { data: createdCategory } = await axiosWithAuth<ICategory>({
			url: API_URL.categories(`/${storeId}`),
			method: 'POST',
			data
		})
		return createdCategory
	}

	async update(id: string, data: ICategoryInput) {
		const { data: updateCategory } = await axiosWithAuth<ICategory>({
			url: API_URL.categories(`/${id}`),
			method: 'PUT',
			data
		})

		return updateCategory
	}

    async delete(id: string) {
		const { data: deleteCategory } = await axiosWithAuth<ICategory>({
			url: API_URL.categories(`/${id}`),
			method: 'DELETE',
			
		})

		return deleteCategory
	}
}


export const categoryService = new CategoryService()