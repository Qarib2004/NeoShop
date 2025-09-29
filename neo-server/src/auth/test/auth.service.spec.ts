import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import {
	BadRequestException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { AuthService } from '../auth.service'
import { UserService } from '../../user/user.service'
import { PrismaService } from '../../prisma.service'
import { Response } from 'express'

describe('AuthService', () => {
	let service: AuthService
	let jwtService: JwtService
	let userService: UserService
	let prismaService: PrismaService
	let configService: ConfigService

	const mockUser = {
		id: 'user-123',
		email: 'test@example.com',
		name: 'Test User',
		picture: null,
		createdAt: new Date(),
		updatedAt: new Date()
	}

	const mockTokens = {
		accessToken: 'mock-access-token',
		refreshToken: 'mock-refresh-token'
	}

	const mockJwtService = {
		sign: jest.fn(),
		verifyAsync: jest.fn()
	}

	const mockUserService = {
		getByEmail: jest.fn(),
		getById: jest.fn(),
		create: jest.fn()
	}

	const mockPrismaService = {
		user: {
			create: jest.fn()
		}
	}

	const mockConfigService = {
		get: jest.fn()
	}

	const mockResponse = {
		cookie: jest.fn()
	} as unknown as Response

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: JwtService,
					useValue: mockJwtService
				},
				{
					provide: UserService,
					useValue: mockUserService
				},
				{
					provide: PrismaService,
					useValue: mockPrismaService
				},
				{
					provide: ConfigService,
					useValue: mockConfigService
				}
			]
		}).compile()

		service = module.get<AuthService>(AuthService)
		jwtService = module.get<JwtService>(JwtService)
		userService = module.get<UserService>(UserService)
		prismaService = module.get<PrismaService>(PrismaService)
		configService = module.get<ConfigService>(ConfigService)

		jest.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('login', () => {
		const loginDto = {
            name:"qarib",
			email: 'test@example.com',
			password: 'password123'
		}

		it('should successfully login user', async () => {
			mockUserService.getByEmail.mockResolvedValue(mockUser)
			mockJwtService.sign
				.mockReturnValueOnce(mockTokens.accessToken)
				.mockReturnValueOnce(mockTokens.refreshToken)

			const result = await service.login(loginDto)

			expect(mockUserService.getByEmail).toHaveBeenCalledWith(loginDto.email)
			expect(mockJwtService.sign).toHaveBeenCalledTimes(2)
			expect(result).toEqual({
				user: mockUser,
				accessToken: mockTokens.accessToken,
				refreshToken: mockTokens.refreshToken
			})
		})

		it('should throw NotFoundException when user not found', async () => {
			mockUserService.getByEmail.mockResolvedValue(null)

			await expect(service.login(loginDto)).rejects.toThrow(NotFoundException)
			expect(mockUserService.getByEmail).toHaveBeenCalledWith(loginDto.email)
		})
	})

	describe('register', () => {
		const registerDto = {
            name:"qarib",
			email: 'newuser@example.com',
			password: 'password123'
		}

		it('should successfully register new user', async () => {
			mockUserService.getByEmail.mockResolvedValue(null)
			mockUserService.create.mockResolvedValue(mockUser)
			mockJwtService.sign
				.mockReturnValueOnce(mockTokens.accessToken)
				.mockReturnValueOnce(mockTokens.refreshToken)

			const result = await service.register(registerDto)

			expect(mockUserService.getByEmail).toHaveBeenCalledWith(registerDto.email)
			expect(mockUserService.create).toHaveBeenCalledWith(registerDto)
			expect(result).toEqual({
				user: mockUser,
				accessToken: mockTokens.accessToken,
				refreshToken: mockTokens.refreshToken
			})
		})

		it('should throw BadRequestException when user already exists', async () => {
			mockUserService.getByEmail.mockResolvedValue(mockUser)

			await expect(service.register(registerDto)).rejects.toThrow(
				BadRequestException
			)
			expect(mockUserService.create).not.toHaveBeenCalled()
		})

		it('should throw Error when user creation fails', async () => {
			mockUserService.getByEmail.mockResolvedValue(null)
			mockUserService.create.mockResolvedValue(null)

			await expect(service.register(registerDto)).rejects.toThrow(
				'User not found'
			)
		})
	})

	describe('getNewTokens', () => {
		it('should successfully refresh tokens', async () => {
			const refreshToken = 'valid-refresh-token'
			mockJwtService.verifyAsync.mockResolvedValue({ id: mockUser.id })
			mockUserService.getById.mockResolvedValue(mockUser)
			mockJwtService.sign
				.mockReturnValueOnce(mockTokens.accessToken)
				.mockReturnValueOnce(mockTokens.refreshToken)

			const result = await service.getNewTokens(refreshToken)

			expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(refreshToken)
			expect(mockUserService.getById).toHaveBeenCalledWith(mockUser.id)
			expect(result).toEqual({
				user: mockUser,
				accessToken: mockTokens.accessToken,
				refreshToken: mockTokens.refreshToken
			})
		})

		it('should throw UnauthorizedException for invalid token', async () => {
			mockJwtService.verifyAsync.mockResolvedValue(null)

			await expect(service.getNewTokens('invalid-token')).rejects.toThrow(
				UnauthorizedException
			)
		})

		it('should throw Error when user not found', async () => {
			mockJwtService.verifyAsync.mockResolvedValue({ id: 'non-existent-id' })
			mockUserService.getById.mockResolvedValue(null)

			await expect(service.getNewTokens('valid-token')).rejects.toThrow(
				'User not found'
			)
		})
	})

	describe('issueTokens', () => {
		it('should generate access and refresh tokens', () => {
			mockJwtService.sign
				.mockReturnValueOnce(mockTokens.accessToken)
				.mockReturnValueOnce(mockTokens.refreshToken)

			const result = service.issueTokens(mockUser.id)

			expect(mockJwtService.sign).toHaveBeenCalledWith(
				{ id: mockUser.id },
				{ expiresIn: '1h' }
			)
			expect(mockJwtService.sign).toHaveBeenCalledWith(
				{ id: mockUser.id },
				{ expiresIn: '7d' }
			)
			expect(result).toEqual(mockTokens)
		})
	})

	describe('validateOAuthLogin', () => {
		const mockOAuthUser = {
			email: 'oauth@example.com',
			name: 'OAuth User',
			picture: 'https://picture.url'
		}

		it('should return existing user and tokens', async () => {
			mockUserService.getByEmail.mockResolvedValue(mockUser)
			mockJwtService.sign
				.mockReturnValueOnce(mockTokens.accessToken)
				.mockReturnValueOnce(mockTokens.refreshToken)

			const result = await service.validateOAuthLogin({ user: mockOAuthUser })

			expect(mockUserService.getByEmail).toHaveBeenCalledWith(
				mockOAuthUser.email
			)
			expect(mockPrismaService.user.create).not.toHaveBeenCalled()
			expect(result).toEqual({
				user: mockUser,
				accessToken: mockTokens.accessToken,
				refreshToken: mockTokens.refreshToken
			})
		})

		it('should create new user and return tokens', async () => {
			const newUser = { ...mockUser, email: mockOAuthUser.email }
			mockUserService.getByEmail.mockResolvedValue(null)
			mockPrismaService.user.create.mockResolvedValue(newUser)
			mockJwtService.sign
				.mockReturnValueOnce(mockTokens.accessToken)
				.mockReturnValueOnce(mockTokens.refreshToken)

			const result = await service.validateOAuthLogin({ user: mockOAuthUser })

			expect(mockPrismaService.user.create).toHaveBeenCalledWith({
				data: {
					email: mockOAuthUser.email,
					name: mockOAuthUser.name,
					picture: mockOAuthUser.picture
				},
				include: {
					stores: true,
					favorites: true,
					orders: true
				}
			})
			expect(result).toEqual({
				user: newUser,
				accessToken: mockTokens.accessToken,
				refreshToken: mockTokens.refreshToken
			})
		})
	})

	describe('addRefreshTokenToResponce', () => {
		it('should set refresh token cookie with correct options', () => {
			const domain = 'example.com'
			mockConfigService.get.mockReturnValue(domain)

			service.addRefreshTokenToResponce(mockResponse, mockTokens.refreshToken)

			expect(mockResponse.cookie).toHaveBeenCalledWith(
				'refreshToken',
				mockTokens.refreshToken,
				expect.objectContaining({
					httpOnly: true,
					domain: domain,
					secure: true,
					sameSite: 'none',
					expires: expect.any(Date)
				})
			)
		})
	})

	describe('removeRefreshTokenFromResponce', () => {
		it('should clear refresh token cookie', () => {
			const domain = 'example.com'
			mockConfigService.get.mockReturnValue(domain)

			service.removeRefreshTokenFromResponce(mockResponse)

			expect(mockResponse.cookie).toHaveBeenCalledWith(
				'refreshToken',
				'',
				expect.objectContaining({
					httpOnly: true,
					domain: domain,
					secure: true,
					sameSite: 'none',
					expires: new Date(0)
				})
			)
		})
	})
})