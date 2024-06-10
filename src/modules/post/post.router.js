import {Router} from 'express';
import * as controller from './post.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import uploadFile, { fileType } from '../../services/multer.js';
import { asyncHandler } from '../../services/errorHandling.js';
import { endPoints } from './post.roles.js';
import validation from '../../middleware/validation.middleware.js';
import * as schema from './post.validation.js'
const router = Router();

router.get('/',asyncHandler(controller.getPosts))
router.get('/getDetails/:id',asyncHandler(controller.getDetailes))
router.post('/',uploadFile(fileType.image).fields([
    {name:"mainImage",maxCount:1},
    {name:"images",maxCount:20}
]),validation(schema.createPostSchema),auth(endPoints.createPost),asyncHandler(controller.createPost))
router.patch('/update/:id',auth(endPoints.updatePost),validation(schema.updatePostSchema),asyncHandler(controller.updatePost))
router.delete('/delete/:id',auth(endPoints.deletePost),validation(schema.deletePostSchema),asyncHandler(controller.deletePost))
router.patch('/like/:id',auth(endPoints.likePost),validation(schema.likePostSchema),asyncHandler(controller.likePost))
router.post('/comment/:id',uploadFile(fileType.image).single('image'),validation(schema.createCommentSchema),auth(endPoints.comment),asyncHandler(controller.createComment))
router.delete('/deleteComment/:id',auth(endPoints.deleteComment),validation(schema.deleteCommentSchema),asyncHandler(controller.deleteComment))
export default router;