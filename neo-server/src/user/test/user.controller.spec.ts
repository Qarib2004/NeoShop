import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";



describe('UserController', () => {
    let controller: UserController;
    let service: UserService;
  
    const mockUserService = {
      getById: jest.fn(),
      toogleFavorites: jest.fn(),
    };
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [
          {
            provide: UserService,
            useValue: mockUserService,
          },
        ],
      }).compile();
  
      controller = module.get<UserController>(UserController);
      service = module.get<UserService>(UserService);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getProfile', () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        stores: [],
        favorites: [],
        orders: [],
      };
  
      it('should return user profile', async () => {
        mockUserService.getById.mockResolvedValue(mockUser);
  
        const result = await controller.getProfile('user-123');
  
        expect(result).toEqual(mockUser);
        expect(service.getById).toHaveBeenCalledWith('user-123');
        expect(service.getById).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('toggleFavorites', () => {
      it('should toggle favorites for a product', async () => {
        mockUserService.toogleFavorites.mockResolvedValue(true);
  
        const result = await controller.toggleFavorites('user-123', 'product-456');
  
        expect(result).toBe(true);
        expect(service.toogleFavorites).toHaveBeenCalledWith(
          'product-456',
          'user-123'
        );
        expect(service.toogleFavorites).toHaveBeenCalledTimes(1);
      });
  
      it('should handle toggle favorites with correct parameter order', async () => {
        mockUserService.toogleFavorites.mockResolvedValue(true);
  
        await controller.toggleFavorites('user-999', 'product-888');
  
        expect(service.toogleFavorites).toHaveBeenCalledWith(
          'product-888',
          'user-999'
        );
      });
    });
  });