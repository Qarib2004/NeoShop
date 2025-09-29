import { PrismaService } from "../../prisma.service";
import { UserService } from "../user.service";
import { CloudinaryService } from "../../cloudinary/cloudinary.service";
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { hash } from 'argon2';


jest.mock('argon2', () => ({
    hash: jest.fn(),
  }));
  
  describe('UserService', () => {
    let service: UserService;
    let prisma: PrismaService;
    let cloudinary: CloudinaryService;
  
    const mockPrismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };
  
    const mockCloudinaryService = {
      uploadImage: jest.fn(),
    };
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserService,
          {
            provide: PrismaService,
            useValue: mockPrismaService,
          },
          {
            provide: CloudinaryService,
            useValue: mockCloudinaryService,
          },
        ],
      }).compile();
  
      service = module.get<UserService>(UserService);
      prisma = module.get<PrismaService>(PrismaService);
      cloudinary = module.get<CloudinaryService>(CloudinaryService);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getById', () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed',
        picture: null,
        stores: [],
        favorites: [],
        orders: [],
      };
  
      it('should return user by string id', async () => {
        mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
  
        const result = await service.getById('user-123');
  
        expect(result).toEqual(mockUser);
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
          where: { id: 'user-123' },
          include: {
            stores: true,
            favorites: {
              include: {
                category: true,
              },
            },
            orders: true,
          },
        });
      });
  
      it('should return user by object id', async () => {
        mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
  
        const result = await service.getById({ id: 'user-123' });
  
        expect(result).toEqual(mockUser);
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
          where: { id: 'user-123' },
          include: {
            stores: true,
            favorites: {
              include: {
                category: true,
              },
            },
            orders: true,
          },
        });
      });
  
      it('should throw BadRequestException if id is not provided', async () => {
        await expect(service.getById('' as any)).rejects.toThrow(BadRequestException);
        await expect(service.getById('' as any)).rejects.toThrow(
          'User ID is required'
        );
      });
  
      it('should throw BadRequestException if id is undefined', async () => {
        await expect(service.getById(undefined as any)).rejects.toThrow(BadRequestException);
      });
  
      it('should throw NotFoundException if user not found', async () => {
        mockPrismaService.user.findUnique.mockResolvedValue(null);
  
        await expect(service.getById('non-existent')).rejects.toThrow(
          NotFoundException
        );
        await expect(service.getById('non-existent')).rejects.toThrow(
          'User not found'
        );
      });
    });
  
    describe('getByEmail', () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed',
        picture: null,
        stores: [],
        favorites: [],
        orders: [],
      };
  
      it('should return user by email', async () => {
        mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
  
        const result = await service.getByEmail('test@example.com');
  
        expect(result).toEqual(mockUser);
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
          where: { email: 'test@example.com' },
          include: { stores: true, favorites: true, orders: true },
        });
      });
  
      it('should return null if user not found', async () => {
        mockPrismaService.user.findUnique.mockResolvedValue(null);
  
        const result = await service.getByEmail('nonexistent@example.com');
  
        expect(result).toBeNull();
      });
    });
  
    describe('updateUserAvatar', () => {
      const mockFile = {
        fieldname: 'file',
        originalname: 'avatar.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
        size: 1024,
      } as Express.Multer.File;
  
      const mockUpdatedUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        picture: 'https://cloudinary.com/image.jpg',
      };
  
      it('should update user avatar', async () => {
        mockCloudinaryService.uploadImage.mockResolvedValue(
          'https://cloudinary.com/image.jpg'
        );
        mockPrismaService.user.update.mockResolvedValue(mockUpdatedUser);
  
        const result = await service.updateUserAvatar('user-123', mockFile);
  
        expect(cloudinary.uploadImage).toHaveBeenCalledWith(mockFile);
        expect(prisma.user.update).toHaveBeenCalledWith({
          where: { id: 'user-123' },
          data: { picture: 'https://cloudinary.com/image.jpg' },
        });
        expect(result).toEqual(mockUpdatedUser);
      });
    });
  
    describe('toogleFavorites', () => {
      const mockUserWithFavorites = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        favorites: [
          { id: 'product-1', name: 'Product 1' },
          { id: 'product-2', name: 'Product 2' },
        ],
        stores: [],
        orders: [],
      };
  
      const mockUserWithoutFavorites = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        favorites: [],
        stores: [],
        orders: [],
      };
  
      it('should disconnect product if it exists in favorites', async () => {
        mockPrismaService.user.findUnique.mockResolvedValue(
          mockUserWithFavorites
        );
        mockPrismaService.user.update.mockResolvedValue(true);
  
        const result = await service.toogleFavorites('product-1', 'user-123');
  
        expect(prisma.user.update).toHaveBeenCalledWith({
          where: { id: 'user-123' },
          data: {
            favorites: {
              disconnect: { id: 'product-1' },
            },
          },
        });
        expect(result).toBe(true);
      });
  
      it('should connect product if it does not exist in favorites', async () => {
        mockPrismaService.user.findUnique.mockResolvedValue(
          mockUserWithoutFavorites
        );
        mockPrismaService.user.update.mockResolvedValue(true);
  
        const result = await service.toogleFavorites('product-3', 'user-123');
  
        expect(prisma.user.update).toHaveBeenCalledWith({
          where: { id: 'user-123' },
          data: {
            favorites: {
              connect: { id: 'product-3' },
            },
          },
        });
        expect(result).toBe(true);
      });
  
      it('should throw NotFoundException if user not found', async () => {
        mockPrismaService.user.findUnique.mockResolvedValue(null);
  
        await expect(
          service.toogleFavorites('product-1', 'non-existent')
        ).rejects.toThrow(NotFoundException);
        await expect(
          service.toogleFavorites('product-1', 'non-existent')
        ).rejects.toThrow('User not found');
      });
    });
  
    describe('create', () => {
      const createDto = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
      };
  
      const mockCreatedUser = {
        id: 'user-456',
        name: 'New User',
        email: 'newuser@example.com',
        password: 'hashed_password',
        picture: null,
      };
  
      it('should create a new user with hashed password', async () => {
        (hash as jest.Mock).mockResolvedValue('hashed_password');
        mockPrismaService.user.create.mockResolvedValue(mockCreatedUser);
  
        const result = await service.create(createDto);
  
        expect(hash).toHaveBeenCalledWith('password123');
        expect(prisma.user.create).toHaveBeenCalledWith({
          data: {
            name: 'New User',
            email: 'newuser@example.com',
            password: 'hashed_password',
          },
        });
        expect(result).toEqual(mockCreatedUser);
      });
    });
  });