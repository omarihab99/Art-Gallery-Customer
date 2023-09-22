import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();
async function getProducts(request : Request, response: Response){
    const products = await prisma.product.findMany();
    return response.json(products);
}
async function postProduct(request: Request, response: Response){
    const product = request.body;
    await prisma.product.create({
        data: product
    });
    return response.json(product);
}
async function updateProduct(request: Request, response: Response){
    const product = request.body;
    if(!product.id || isNaN(product.id)){
        return response.status(400).json({
            message: 'Invalid ID'
        });
    }
    await prisma.product.update({
        where: {
            id: product.id
        },
        data: product
    });
    return response.json(product);
}
async function getSingleProduct(request: Request, response: Response){
    const id = parseInt(request.params.id);
    if(!id || isNaN(id)){
        return response.status(400).json({
            message: 'Invalid ID'
        });
    }
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    });
    return response.json(product);
}
async function deleteProduct(request: Request, response: Response){
    const id = parseInt(request.params.id);
    if(isNaN(id)){
        return response.status(400).json({
            message: 'Invalid ID'
        });
    }
    await prisma.product.delete({
        where: {
            id: id
        }
    });
    return response.json({message: 'Product deleted'});
}
    

export{
    getProducts, postProduct, updateProduct, getSingleProduct, deleteProduct
}