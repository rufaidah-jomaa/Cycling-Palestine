import {Router} from 'express';
import * as controller from './post.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import uploadFile, { fileValidation } from '../../services/multer.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router();

router.get('/',asyncHandler(controller.getPosts))
router.post('/',auth,uploadFile(fileValidation.image).single('image'),asyncHandler(controller.createPost));//بدها تعديل لانه بدو ينشر اكثر من صورة
router.patch('/like/:id',auth,asyncHandler(controller.likePost))
router.post('/comment/:id',auth,uploadFile(fileValidation.image).single('image'),asyncHandler(controller.createComment))
export default router;