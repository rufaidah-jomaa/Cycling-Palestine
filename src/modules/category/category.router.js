import {Router} from 'express';
import * as controller from './category.controller.js'
import uploadFile, { fileType } from '../../services/multer.js';
import { asyncHandler } from '../../services/errorHandling.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './category.role.js';
const router = Router();

router.get('/',controller.testCategory)
router.post('/create',auth(endPoints.create),uploadFile(fileType.image).single('image'),asyncHandler(controller.createCategory))
router.get('/getAll',auth(endPoints.getAll),asyncHandler(controller.getAll))
router.get('/getActive',asyncHandler(controller.getActive))
router.get('/getDetails/:id',asyncHandler(controller.getDetails))
router.patch('/update/:id',auth(endPoints.update),uploadFile(fileType.image).single('image'),asyncHandler(controller.update))
router.delete('/delete/:id',auth(endPoints.destroy),asyncHandler(controller.destroy))
export default router;