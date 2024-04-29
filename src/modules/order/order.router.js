import { Router } from "express";
const router  = Router();
import * as controller from './order.controller.js'

router.get('/',controller.getOrderTest)
export default router;