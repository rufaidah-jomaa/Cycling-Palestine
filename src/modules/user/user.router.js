import { Router } from "express";
import * as controller from './user.controller.js'
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
import uploadFile, { fileValidation } from "../../services/multer.js";
const router = Router();

router.get('/',controller.getuser)
router.get('/getProfile',asyncHandler(auth),asyncHandler(controller.getProfile))
router.patch('/uploadPic',auth,uploadFile(fileValidation.image).single('image'),asyncHandler(controller.uploadPic))

export default router;
 