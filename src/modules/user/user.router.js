import { Router } from "express";
import * as controller from './user.controller.js'
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
import uploadFile, { fileType } from "../../services/multer.js";
import { endPoints } from "./user.roles.js";
import validation from "../../middleware/validation.middleware.js";
import * as schema from './user.validation.js'
const router = Router();

router.get('/getAll',auth(endPoints.getAll),asyncHandler(controller.getUsers))
router.get('/getProfile',auth(endPoints.getProfile),asyncHandler(controller.getProfile))
router.patch('/uploadPic',auth(endPoints.uploadPic),uploadFile(fileType.image).single('image'),validation(schema.uploadPicSchema),asyncHandler(controller.uploadPic))
router.delete('/deleteImage',auth(endPoints.deleteImage),asyncHandler(controller.deleteImage))
router.patch('/updateProfile/:id',auth(endPoints.updateProfile),uploadFile(fileType.image).single('image'),validation(schema.updateProfileSchema),asyncHandler(controller.updateProfile))
router.delete('/deleteAccount/:id',auth(endPoints.deletAccount),validation(schema.deleteAccountSchema),asyncHandler(controller.deleteAccount))
router.patch('/blockUser/:id',auth(endPoints.blockUser),validation(schema.blockUserSchema),asyncHandler(controller.blockUser))
router.patch('/unblockUser/:id',auth(endPoints.unBlockUser),validation(schema.unblockUserSchema),asyncHandler(controller.unBlockUser))
router.patch('/addAdmin/:id',auth(endPoints.addAdmin),validation(schema.addAdminSchema),asyncHandler(controller.addAdmin))
router.patch('/removeAdmin/:id',auth(endPoints.removeAdmin),validation(schema.removeAdminSchema),asyncHandler(controller.removeAdmin))
export default router;
 