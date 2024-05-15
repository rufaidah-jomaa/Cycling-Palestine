import { Router } from "express";
const router  = Router({mergeParams:true});
import * as controller from './participating.controller.js'
import { auth } from "../../middleware/auth.middleware.js";

import { asyncHandler } from "../../services/errorHandling.js";
import { endPoints } from "./participting.roles.js";

router.get('/',controller.getpartest)
router.post('/',auth(endPoints.participate),asyncHandler(controller.participate))
router.delete('/cancel',auth(endPoints.cancel),asyncHandler(controller.cancel))
export default router;