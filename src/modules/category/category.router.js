import {Router} from 'express';
import * as controller from './category.controller.js'
import uploadFile, { fileType } from '../../services/multer.js';
import { asyncHandler } from '../../services/errorHandling.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './category.role.js';
import validation from '../../middleware/validation.middleware.js';
import * as schema from './category.validation.js'
const router = Router();

router.get('/',controller.testCategory)
router.post('/create',uploadFile(fileType.image).single('image'),validation(schema.createCategorySchema),auth(endPoints.create),asyncHandler(controller.createCategory))
router.get('/getAll',auth(endPoints.getAll),asyncHandler(controller.getAll))
router.get('/getActive',asyncHandler(controller.getActive))
router.get('/getDetails/:id',validation(schema.getDetailsSchema),asyncHandler(controller.getDetails))
router.patch('/update/:id',uploadFile(fileType.image).single('image'),validation(schema.updateCategorySchema),auth(endPoints.update),asyncHandler(controller.update))
router.delete('/delete/:id',auth(endPoints.destroy),validation(schema.deleteCategorySchema),asyncHandler(controller.destroy))
export default router;