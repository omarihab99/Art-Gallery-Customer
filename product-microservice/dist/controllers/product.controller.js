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
exports.deleteProduct = exports.getSingleProduct = exports.updateProduct = exports.postProduct = exports.getProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getProducts(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield prisma.product.findMany();
        return response.json(products);
    });
}
exports.getProducts = getProducts;
function postProduct(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = request.body;
        yield prisma.product.create({
            data: product
        });
        return response.json(product);
    });
}
exports.postProduct = postProduct;
function updateProduct(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = request.body;
        if (!product.id || isNaN(product.id)) {
            return response.status(400).json({
                message: 'Invalid ID'
            });
        }
        yield prisma.product.update({
            where: {
                id: product.id
            },
            data: product
        });
        return response.json(product);
    });
}
exports.updateProduct = updateProduct;
function getSingleProduct(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(request.params.id);
        if (isNaN(id)) {
            return response.status(400).json({
                message: 'Invalid ID'
            });
        }
        const product = yield prisma.product.findUnique({
            where: {
                id: id
            }
        });
        return response.json(product);
    });
}
exports.getSingleProduct = getSingleProduct;
function deleteProduct(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(request.params.id);
        if (isNaN(id)) {
            return response.status(400).json({
                message: 'Invalid ID'
            });
        }
        yield prisma.product.delete({
            where: {
                id: id
            }
        });
        return response.json({ message: 'Product deleted' });
    });
}
exports.deleteProduct = deleteProduct;
