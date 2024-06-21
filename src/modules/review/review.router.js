import {Router} from 'express'
import * as controller from './review.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './review.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
import validation from '../../middleware/validation.middleware.js';
import * as schema from './review.validation.js'
const router= Router({mergeParams:true})

router.post('/',auth(endPoints.create),validation(schema.createReviewSchema),asyncHandler(controller.create))
router.patch('/:reviewId',auth(endPoints.update),validation(schema.updateReviewSchema),asyncHandler(controller.update))
router.delete('/:reviewId',auth(endPoints.delete),validation(schema.deleteReviewSchema),asyncHandler(controller.destroy))
router.get('/',asyncHandler(controller.get))
export default router;