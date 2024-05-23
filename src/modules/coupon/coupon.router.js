import {Router} from 'express';
import * as controller from './coupon.controller.js'
import { auth, roles } from '../../middleware/auth.middleware.js';
import { endPoints } from './coupon.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router=Router();

router.post('/create',auth(endPoints.create),asyncHandler(controller.create))
router.get('/getAll',auth(endPoints.getAll),asyncHandler(controller.getAll))
router.patch('/update/:id',auth(endPoints.update),asyncHandler(controller.update))
router.delete('/delete/:id',auth(endPoints.delete),asyncHandler(controller.destroy))
export default router;