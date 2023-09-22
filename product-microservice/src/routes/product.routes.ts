import { Router } from "express";
import { getProducts, postProduct, updateProduct, getSingleProduct, deleteProduct } from "../controllers/product.controller";
import { validateCreate, validateUpdate } from "../middlewares/validation.middleware";
const router = Router();
router.get('/', getProducts);
router.post('/', validateCreate, postProduct);
router.get('/:id', getSingleProduct);
router.patch('/:id', validateUpdate, updateProduct);
router.delete('/:id', deleteProduct);

export {
    router as ProductRouter
}