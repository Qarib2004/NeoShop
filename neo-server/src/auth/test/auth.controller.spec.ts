import { Test, TestingModule } from '@nestjs/testing'
import { UnauthorizedException } from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthController } from '../auth.controller'
import { AuthService } from '../auth.service'
import { AuthDto } from '../dto/auth.dto'

describe('AuthController', () => {
	let controller: AuthController
	let authService: AuthService

	const mockAuthService = {
		login: jest.fn(),
		register: jest.fn(),
		getNewTokens: jest.fn(),
		validateOAuthLogin: jest.fn(),
		addRefreshTokenToResponce: jest.fn(),
		removeRefreshTokenFromResponce: jest.fn(),
		REFRESH_TOEKN_NAME: 'refreshToken'
	}

	const mockResponse = {
		cookie: jest.fn(),
		redirect: jest.fn()
	} as unknown as Response

	const mockRequest = {
		cookies: {}
	} as Request

	const mockUser = {
		id: 'user-123',
		email: 'test@example.com',
		name: 'Test User'
	}

	const mockTokens = {
		accessToken: 'mock-access-token',
		refreshToken: 'mock-refresh-token'
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: mockAuthService
				}
			]
		}).compile()

		controller = module.get<AuthController>(AuthController)
		authService = module.get<AuthService>(AuthService)

		jest.clearAllMocks()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	describe('login', () => {
		const loginDto: AuthDto = {
            name:"qarib",
			email: 'test@example.com',
			password: 'password123'
		}

		it('should successfully login and set refresh token cookie', async () => {
			mockAuthService.login.mockResolvedValue({
				user: mockUser,
				accessToken: mockTokens.accessToken,
				refreshToken: mockTokens.refreshToken
			})

			const result = await controller.login(loginDto, mockResponse)

			expect(mockAuthService.login).toHaveBeenCalledWith(loginDto)
			expect(mockAuthService.addRefreshTokenToResponce).toHaveBeenCalledWith(
				mockResponse,
				mockTokens.refreshToken
			)
			expect(result).toEqual({
				user: mockUser,
				accessToken: mockTokens.accessToken
			})
		})
	})

	describe('register', () => {
		const registerDto: AuthDto = {
            name:"qarib",
			email: 'newuser@example.com',
			password: 'password123'
		}

		it('should successfully register and set refresh token cookie', async () => {
			mockAuthService.register.mockResolvedValue({
				user: mockUser,
				accessToken: mockTokens.accessToken,
				refreshToken: mockTokens.refreshToken
			})

			const result = await controller.register(registerDto, mockResponse)

			expect(mockAuthService.register).toHaveBeenCalledWith(registerDto)
			expect(mockAuthService.addRefreshTokenToResponce).toHaveBeenCalledWith(
				mockResponse,
				mockTokens.refreshToken
			)
			expect(result).toEqual({
				user: mockUser,
				accessToken: mockTokens.accessToken
			})
		})
	})

	describe('getNewTokens', () => {
		it('should successfully refresh tokens', async () => {
			const refreshToken = 'valid-refresh-token'
			mockRequest.cookies[mockAuthService.REFRESH_TOEKN_NAME] = refreshToken
			mockAuthService.getNewTokens.mockResolvedValue({
				user: mockUser,
				accessToken: mockTokens.accessToken,
				refreshToken: mockTokens.refreshToken
			})

			const result = await controller.getNewTokens(mockRequest, mockResponse)

			expect(mockAuthService.getNewTokens).toHaveBeenCalledWith(refreshToken)
			expect(mockAuthService.addRefreshTokenToResponce).toHaveBeenCalledWith(
				mockResponse,
				mockTokens.refreshToken
			)
			expect(result).toEqual({
				user: mockUser,
				accessToken: mockTokens.accessToken
			})
		})

		it('should throw UnauthorizedException when refresh token is missing', async () => {
			mockRequest.cookies = {}

			await expect(
				controller.getNewTokens(mockRequest, mockResponse)
			).rejects.toThrow(UnauthorizedException)

			expect(
				mockAuthService.removeRefreshTokenFromResponce
			).toHaveBeenCalledWith(mockResponse)
			expect(mockAuthService.getNewTokens).not.toHaveBeenCalled()
		})
	})

	describe('logout', () => {
		it('should successfully logout and clear refresh token', async () => {
			const result = await controller.logout(mockResponse)

			expect(
				mockAuthService.removeRefreshTokenFromResponce
			).toHaveBeenCalledWith(mockResponse)
			expect(result).toBe(true)
		})
	})

	describe('googleAuth', () => {
		it('should call google auth', async () => {
			const result = await controller.googleAuth(mockRequest)
			expect(result).toBeUndefined()
		})
	})

	describe('googleAuthCallback', () => {
		it('should handle google callback and redirect', async () => {
			const mockOAuthRequest = {
				user: {
					email: 'oauth@example.com',
					name: 'OAuth User',
					picture: 'https://picture.url'
				}
			}

			process.env['CLIENT_URL'] = 'http://localhost:3000'

			mockAuthService.validateOAuthLogin.mockResolvedValue({
				user: mockUser,
				accessToken: mockTokens.accessToken,
				refreshToken: mockTokens.refreshToken
			})

			await controller.googleAuthCallback(mockOAuthRequest, mockResponse)

			expect(mockAuthService.validateOAuthLogin).toHaveBeenCalledWith(
				mockOAuthRequest
			)
			expect(mockAuthService.addRefreshTokenToResponce).toHaveBeenCalledWith(
				mockResponse,
				mockTokens.refreshToken
			)
			expect(mockResponse.redirect).toHaveBeenCalledWith(
				`http://localhost:3000/dashboard?accessToekn=${mockTokens.accessToken}`
			)
		})
	})
})