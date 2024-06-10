import { Router } from "express";
const router  = Router();
import * as controller from './order.controller.js'
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./order.roles.js";
import { asyncHandler } from "../../services/errorHandling.js";
import validation from "../../middleware/validation.middleware.js";
import * as schema from './order.validation.js'

router.get('/',controller.getOrderTest)
router.post('/create',validation(schema.createOrderSchema),auth(endPoints.create),asyncHandler(controller.create))
router.get('/getAll',auth(endPoints.getOrders),asyncHandler(controller.getOrders))
router.get('/myOrders',auth(endPoints.myOrders),asyncHandler(controller.getMyOrders))
router.patch('/changeStatus/:orderId',validation(schema.changeStatusSchema),auth(endPoints.changeStatus),asyncHandler(controller.changeStatus))

export default router;