import {Router} from 'express';
import * as controller from './coupon.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './coupon.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router=Router();

router.post('/create',auth(endPoints.create),asyncHandler(controller.create))
export default router;