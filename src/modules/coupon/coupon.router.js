import {Router} from 'express';
import * as controller from './coupon.controller.js'
import { auth, roles } from '../../middleware/auth.middleware.js';
import { endPoints } from './coupon.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
import validation from '../../middleware/validation.middleware.js';
import * as schema from './coupon.validation.js'
const router=Router();

router.post('/create',auth(endPoints.create),validation(schema.createCouponSchema),asyncHandler(controller.create))
router.get('/getAll',auth(endPoints.getAll),asyncHandler(controller.getAll))
router.patch('/update/:id',auth(endPoints.update),validation(schema.updateCouponSchema),asyncHandler(controller.update))
router.delete('/delete/:id',auth(endPoints.delete),validation(schema.deleteCouponSchema),asyncHandler(controller.destroy))
export default router;