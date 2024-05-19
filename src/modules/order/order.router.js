import { Router } from "express";
const router  = Router();
import * as controller from './order.controller.js'
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./order.roles.js";
import { asyncHandler } from "../../services/errorHandling.js";

router.get('/',controller.getOrderTest)
router.post('/create',auth(endPoints.create),asyncHandler(controller.create))
export default router;