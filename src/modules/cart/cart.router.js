import {Router} from 'express'
import * as controller from './cart.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './cart.role.js';
import validation from '../../middleware/validation.middleware.js';
import * as schema from './cart.validation.js'
const router = Router();

router.get('/',auth(endPoints.getFromCart),controller.getProductsFromCart)
router.post('/create',validation(schema.addToCartSchema),auth(endPoints.create),controller.create)
router.patch('/remove/:productId',validation(schema.removeItemSchema),auth(endPoints.remove),controller.remove)
router.patch('/clear',auth(endPoints.clear),controller.clear)
router.patch('/updateQ/:productId',validation(schema.updateQuantitySchema),auth(endPoints.quantity),controller.updateQuantity)
export default router;