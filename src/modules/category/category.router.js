import {Router} from 'express';
import * as controller from './category.controller.js'
import uploadFile, { fileType } from '../../services/multer.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router();

router.get('/',controller.testCategory)
router.post('/create',uploadFile(fileType.image).single('image'),asyncHandler(controller.createCategory))
router.get('/getAll',asyncHandler(controller.getAll))
router.get('/getActive',asyncHandler(controller.getActive))
router.get('/getDetails/:id',asyncHandler(controller.getDetails))
router.patch('/update/:id',uploadFile(fileType.image).single('image'),asyncHandler(controller.update))
router.delete('/delete/:id',asyncHandler(controller.destroy))
export default router;