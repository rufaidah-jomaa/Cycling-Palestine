import { Router } from "express";
const router  = Router();
import * as controller from './product.controller.js'
import reviewRouter from '../review/review.router.js'
import { endPoints } from "./product.roles.js";
import uploadFile, { fileType } from "../../services/multer.js";
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
import validation from "../../middleware/validation.middleware.js";
import * as schema from './product.validation.js'

router.use('/:productId/review',reviewRouter)
router.get('/',controller.test)
router.post('/createProduct',auth(endPoints.createProduct),uploadFile(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4}
]),validation(schema.createProductSchema),asyncHandler(controller.creatProduct))
router.get('/getAll',asyncHandler(controller.getAll))
router.get('/getActive',asyncHandler(controller.getActive))
router.get('/getDetails/:id',validation(schema.getDetailsSchema),asyncHandler(controller.getDetails))
router.get('/getallStatus/:id',validation(schema.getallStatus),auth(endPoints.getStatus),asyncHandler(controller.getAllStatus))
router.patch('/update/:id',auth(endPoints.update),uploadFile(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4}
]),validation(schema.updateProductSchema),asyncHandler(controller.update))
router.patch('/changeStatus/:id',auth(endPoints.changeStatus),validation(schema.changeStatusSchema),asyncHandler(controller.changeStatus))
router.delete('/delete/:id',auth(endPoints.destroy),validation(schema.deleteProductSchema),asyncHandler(controller.destroy))
export default router;