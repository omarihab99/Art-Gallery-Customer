import { Router } from "express";
import { isDataValid} from '../middlewares/data-validation.middleware';
import {getOrders, createOrder, updateOrder} from '../controllers/order.controller';
const router = Router();

router.get('/', getOrders);
router.post('/', isDataValid, createOrder);
router.put('/', isDataValid, updateOrder);

export{
   router as OrderRouter
}