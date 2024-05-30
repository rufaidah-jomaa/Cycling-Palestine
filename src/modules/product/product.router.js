import { Router } from "express";
const router  = Router();
import * as controller from './product.controller.js'
import reviewRouter from '../review/review.router.js'
import { endPoints } from "./product.roles.js";
import uploadFile, { fileType } from "../../services/multer.js";
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";

router.use('/:productId/review',reviewRouter)
router.get('/',controller.test)
router.post('/createProduct',auth(endPoints.createProduct),uploadFile(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4}
]),asyncHandler(controller.creatProduct))
router.get('/getAll/:id',auth(endPoints.getAll),asyncHandler(controller.getAll))
router.get('/getActive/:id',asyncHandler(controller.getActive))
router.get('/getDetails/:id',asyncHandler(controller.getDetails))
router.patch('/update/:id',auth(endPoints.update),uploadFile(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4}
]),asyncHandler(controller.update))

router.delete('/delete/:id',auth(endPoints.destroy),asyncHandler(controller.destroy))
export default router;