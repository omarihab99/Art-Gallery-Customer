import { z as zod } from 'zod';
import { Request, Response,NextFunction } from 'express';
function validateCreate(request: Request, response: Response, next: NextFunction) {
    try {
        const product = request.body;
        const productSchema = zod.object({
            name: zod.string().nonempty(),
            price: zod.number().nonnegative(),
            description: zod.string().nonempty(),
            category: zod.string().nonempty(),
            image: zod.string().nonempty(),
            stock: zod.number().nonnegative(),
            status: zod.enum(['Available', 'Out of Stock']),
        });

        const parsedProduct = productSchema.safeParse(product);
        if (!parsedProduct.success) {
            throw parsedProduct.error;
        }
        return next();
    } catch (error) {
        if (error instanceof zod.ZodError) {
            return response.status(422).json(
                { errors: error.issues.map((issue) => issue.message) }
            );
        }
    }
}

function validateUpdate(request: Request, response: Response, next: NextFunction) {
    try {
        if(!request.params.id || isNaN(parseInt(request.params.id))){
            return response.status(400).json({
                message: 'Invalid ID'
            });
        }
        if(!request.body){
            return response.status(400).json({
                message: 'Invalid Body'
            });
        }
        const product = request.body;
        const productSchema = zod.object({
            name: zod.string(),
            price: zod.number().nonnegative(),
            description: zod.string(),
            category: zod.string(),
            image: zod.string(),
            stock: zod.number(),
            status: zod.enum(['Available', 'Out of Stock']),
        });
        const parsedProduct = productSchema.safeParse(product);
        if (!parsedProduct.success) {
            throw parsedProduct.error;
        }
        return next();
    } catch (error) {
        if (error instanceof zod.ZodError) {
            return response.status(422).json(
                { errors: error.issues.map((issue) => issue.message) }
            );
        }   
    }
   
}

export  {validateCreate, validateUpdate};