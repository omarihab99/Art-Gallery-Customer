"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdate = exports.validateCreate = void 0;
const zod_1 = require("zod");
function validateCreate(request, response, next) {
    try {
        const product = request.body;
        const productSchema = zod_1.z.object({
            name: zod_1.z.string().nonempty(),
            price: zod_1.z.number().nonnegative(),
            description: zod_1.z.string().nonempty(),
            category: zod_1.z.string().nonempty(),
            image: zod_1.z.string().nonempty(),
            stock: zod_1.z.number().nonnegative(),
            status: zod_1.z.enum(['Available', 'Out of Stock']),
        });
        const parsedProduct = productSchema.safeParse(product);
        if (!parsedProduct.success) {
            throw parsedProduct.error;
        }
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return response.status(422).json({ errors: error.issues.map((issue) => issue.message) });
        }
    }
}
exports.validateCreate = validateCreate;
function validateUpdate(request, response, next) {
    try {
        if (!request.params.id || isNaN(parseInt(request.params.id))) {
            return response.status(400).json({
                message: 'Invalid ID'
            });
        }
        if (!request.body) {
            return response.status(400).json({
                message: 'Invalid Body'
            });
        }
        const product = request.body;
        const productSchema = zod_1.z.object({
            name: zod_1.z.string(),
            price: zod_1.z.number().nonnegative(),
            description: zod_1.z.string(),
            category: zod_1.z.string(),
            image: zod_1.z.string(),
            stock: zod_1.z.number(),
            status: zod_1.z.enum(['Available', 'Out of Stock']),
        });
        const parsedProduct = productSchema.safeParse(product);
        if (!parsedProduct.success) {
            throw parsedProduct.error;
        }
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return response.status(422).json({ errors: error.issues.map((issue) => issue.message) });
        }
    }
}
exports.validateUpdate = validateUpdate;
