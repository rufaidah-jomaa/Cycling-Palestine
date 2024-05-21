import { Router } from "express";
import * as controller from './user.controller.js'
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
import uploadFile, { fileType } from "../../services/multer.js";
import { endPoints } from "./user.roles.js";
const router = Router();

router.get('/',controller.getuser)
router.get('/getProfile',auth(endPoints.getProfile),asyncHandler(controller.getProfile))
router.patch('/uploadPic',auth(endPoints.uploadPic),uploadFile(fileType.image).single('image'),asyncHandler(controller.uploadPic))
router.patch('/updateProfile/:id',auth(endPoints.updateProfile),uploadFile(fileType.image).single('image'),asyncHandler(controller.updateProfile))
router.delete('/deleteAccount/:id',auth(endPoints.deletAccount),asyncHandler(controller.deleteAccount))
router.patch('/blockUser/:id',auth(endPoints.blockUser),asyncHandler(controller.blockUser))
router.patch('/unblockUser/:id',auth(endPoints.unBlockUser),asyncHandler(controller.unBlockUser))
router.patch('/addAdmin/:id',auth(endPoints.addAdmin),asyncHandler(controller.addAdmin))
router.patch('/removeAdmin/:id',auth(endPoints.removeAdmin),asyncHandler(controller.removeAdmin))
export default router;
 