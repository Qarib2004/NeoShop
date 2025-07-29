import axios, { CreateAxiosDefaults } from 'axios'
import { config } from 'process'

import { SERVER_URL } from '@/config/api.config'

import {
	getAccessToken,
	removeFromStorage
} from '@/services/auth/auth-token.service'
import { authService } from '@/services/auth/auth.service'

import { errorCatch, getContentType } from './api.helper'

export const options: CreateAxiosDefaults = {
	baseURL: SERVER_URL,
	headers: getContentType(),
	withCredentials: true
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})
axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originRequest = error.config
		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originRequest._isRetry = true
			try {
				await authService.getNewToken()
				return axiosWithAuth.request(originRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
			}
		}
		throw error
	}
)

export { axiosClassic, axiosWithAuth }
