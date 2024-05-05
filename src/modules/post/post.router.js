import {Router} from 'express';
import * as controller from './post.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import uploadFile, { fileType } from '../../services/multer.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router();

router.get('/',asyncHandler(controller.getPosts))
router.post('/',auth(),uploadFile(fileType.image).single('image'),asyncHandler(controller.createPost));//بدها تعديل لانه بدو ينشر اكثر من صورة
router.patch('/like/:id',auth(),asyncHandler(controller.likePost))
router.post('/comment/:id',auth(),uploadFile(fileType.image).single('image'),asyncHandler(controller.createComment))
export default router;