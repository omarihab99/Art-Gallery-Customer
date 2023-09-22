import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getProducts, postProduct, getSingleProduct, deleteProduct, updateProduct } from "../../src/controllers/product.controller";
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
const mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
describe('ProductController', () => {
    beforeAll(() => {

    });
    afterAll(async () => {
        await mockPrisma.$disconnect();
    });
    afterEach(async () => {
        jest.clearAllMocks();
    });
    it('should get all products', async () => {
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
        (mockPrisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
        const req = {} as Request;
        const res = ({
            json: jest.fn(),
        } as unknown) as Response;
        await getProducts(req, res);
        expect(mockPrisma.product.findMany).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockProducts);
    });
    it('should get one product', async () => {
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
        (mockPrisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);
        const req = ({ params: { id: '1' } } as unknown) as Request;
        const res = ({
            json: jest.fn(),
        } as unknown) as Response;
        await getSingleProduct(req, res);
        expect(mockPrisma.product.findUnique).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockProduct);
    });
    it('should delete a product', async () => {
        const req = ({ params: { id: '1' } } as unknown) as Request;
        const res = ({
            json: jest.fn(),
        } as unknown) as Response;
        await deleteProduct(req, res);
        expect(mockPrisma.product.delete).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            message: 'Product deleted'
        });
    });
    it('should update a product', async () => {
        const req = ({
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
        } as unknown) as Request;
        const res: Response = ({
            json: jest.fn(),
        } as unknown) as Response;
        await updateProduct(req, res);
        expect(mockPrisma.product.update).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(
            req.body
        );
    });
    it('should create a product', async () => {
        const req = ({
            body: {
                name: 'product 11',
                price: 100,
                description: 'description 1',
                category: 'category 1',
                image: 'image 1',
                stock: 10,
                status: 'Available'
            }
        } as unknown) as Request;
        const res = ({
            json: jest.fn(),
        } as unknown) as Response;
        await postProduct(req, res);
        expect(mockPrisma.product.create).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(
            req.body
        );
    });
})