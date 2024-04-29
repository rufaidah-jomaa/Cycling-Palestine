import { Router } from "express";
const router  = Router();
import * as controller from './notification.controller.js'

router.get("/",controller.getnoTest)
export default router;