import { Router } from "express";
import * as controller from './user.controller.js'
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
import uploadFile, { fileType } from "../../services/multer.js";
import { endPoints } from "./user.roles.js";
const router = Router();

router.get('/',controller.getuser)
router.get('/getProfile',auth(endPoints.getProfile),asyncHandler(controller.getProfile))
//router.patch('/uploadPic',auth(),uploadFile(fileType.image).single('image'),asyncHandler(controller.uploadPic))
router.patch('/updateProfile/:id',auth(endPoints.updateProfile),uploadFile(fileType.image).single('image'),asyncHandler(controller.updateProfile))

export default router;
 