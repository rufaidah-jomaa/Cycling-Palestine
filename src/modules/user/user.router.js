import { Router } from "express";
import * as controller from './user.controller.js'
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
import uploadFile, { fileType } from "../../services/multer.js";
const router = Router();

router.get('/',controller.getuser)
router.get('/getProfile',auth(),asyncHandler(controller.getProfile))
router.patch('/uploadPic',auth(),uploadFile(fileType.image).single('image'),asyncHandler(controller.uploadPic))

export default router;
 