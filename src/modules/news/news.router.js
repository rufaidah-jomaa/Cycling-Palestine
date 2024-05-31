import {Router} from 'express'
import * as controller from './news.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './news.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router();

router.post('/add',auth(endPoints.add),asyncHandler(controller.add))
router.get('/',auth(endPoints.get),asyncHandler(controller.getNews))
router.patch('/update/:id',auth(endPoints.update),asyncHandler(controller.update))
router.delete('/delete/:id',auth(endPoints.delete),asyncHandler(controller.destroy))

export default router;