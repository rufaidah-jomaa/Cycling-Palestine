import {Router} from 'express';
import * as controller from './category.controller.js'
import uploadFile, { fileType } from '../../services/multer.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router();

router.get('/',controller.testCategory)
router.post('/create',uploadFile(fileType.image).single('image'),asyncHandler(controller.createCategory))

export default router;