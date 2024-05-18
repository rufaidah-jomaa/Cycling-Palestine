import {Router} from 'express'
import * as controller from './cart.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './cart.role.js';
const router = Router();

router.get('/',controller.test)
router.post('/create',auth(endPoints.create),controller.create)
router.patch('/remove/:productId',auth(endPoints.remove),controller.remove)
router.patch('/clear',auth(endPoints.clear),controller.clear)
router.patch('/updateQ/:productId',auth(endPoints.quantity),controller.updateQuantity)
export default router;