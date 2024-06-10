import {Router} from 'express'
import * as controller from './news.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './news.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
import validation from '../../middleware/validation.middleware.js';
import * as schema from './news.validation.js'
const router = Router();

router.post('/add',validation(schema.addSchema),auth(endPoints.add),asyncHandler(controller.add))
router.get('/',auth(endPoints.get),asyncHandler(controller.getNews))
router.patch('/update/:id',validation(schema.updateNewsSchema),auth(endPoints.update),asyncHandler(controller.update))
router.delete('/delete/:id',validation(schema.deleteNewsSchema),auth(endPoints.delete),asyncHandler(controller.destroy))

export default router;