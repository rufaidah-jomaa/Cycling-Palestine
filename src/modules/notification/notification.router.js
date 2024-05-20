import { Router } from "express";
const router  = Router();
import * as controller from './notification.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./notification.roles.js";

router.get("/",auth(endPoints.get),asyncHandler(controller.getNotifications))

export default router;