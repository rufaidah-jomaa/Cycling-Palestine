import {Router} from 'express'
import * as controller from './review.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './review.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';

const router= Router({mergeParams:true})

router.post('/',auth(endPoints.create),asyncHandler(controller.create))
router.patch('/:reviewId',auth(endPoints.update),asyncHandler(controller.update))
router.delete('/:reviewId',auth(endPoints.delete),asyncHandler(controller.destroy))
export default router;