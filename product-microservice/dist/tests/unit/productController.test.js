"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const product_controller_1 = require("../../src/controllers/product.controller");
jest.mock('@prisma/client', () => {
    const mockPrisma = {
        product: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            // Mock other Prisma methods as needed
        },
        // Mock other Prisma methods as needed
    };
    return {
        PrismaClient: jest.fn(() => mockPrisma),
    };
});
const mockPrisma = new client_1.PrismaClient();
describe('ProductController', () => {
    beforeAll(() => {
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mockPrisma.$disconnect();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.clearAllMocks();
    }));
    it('should get all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProducts = [
            {
                id: 1,
                name: 'product 1',
                price: 100,
                description: 'description 1',
                category: 'category 1',
                image: 'image 1',
                stock: 10,
                status: 'Available'
            }
        ];
        mockPrisma.product.findMany.mockResolvedValue(mockProducts);
        const req = {};
        const res = {
            json: jest.fn(),
        };
        yield (0, product_controller_1.getProducts)(req, res);
        expect(mockPrisma.product.findMany).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockProducts);
    }));
    it('should get one product', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProduct = {
            id: 1,
            name: 'product 1',
            price: 100,
            description: 'description 1',
            category: 'category 1',
            image: 'image 1',
            stock: 10,
            status: 'Available'
        };
        mockPrisma.product.findUnique.mockResolvedValue(mockProduct);
        const req = { params: { id: '1' } };
        const res = {
            json: jest.fn(),
        };
        yield (0, product_controller_1.getSingleProduct)(req, res);
        expect(mockPrisma.product.findUnique).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockProduct);
    }));
    it('should delete a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { params: { id: '1' } };
        const res = {
            json: jest.fn(),
        };
        yield (0, product_controller_1.deleteProduct)(req, res);
        expect(mockPrisma.product.delete).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            message: 'Product deleted'
        });
    }));
    it('should update a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                id: '1',
                name: 'product 11',
                price: 100,
                description: 'description 1',
                category: 'category 1',
                image: 'image 1',
                stock: 10,
                status: 'Available'
            }
        };
        const res = {
            json: jest.fn(),
        };
        yield (0, product_controller_1.updateProduct)(req, res);
        expect(mockPrisma.product.update).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(req.body);
    }));
    it('should create a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                name: 'product 11',
                price: 100,
                description: 'description 1',
                category: 'category 1',
                image: 'image 1',
                stock: 10,
                status: 'Available'
            }
        };
        const res = {
            json: jest.fn(),
        };
        yield (0, product_controller_1.postProduct)(req, res);
        expect(mockPrisma.product.create).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(req.body);
    }));
});
