import {Router} from 'express'
import * as controller from './auth.controller.js'
import { asyncHandler } from '../../services/errorHandling.js';
import { signupSchema , signinSchema} from './auth.validation.js';
import validation from '../../middleware/validation.middleware.js';
const router=Router();

router.get('/',controller.getauth)

router.post('/signup',validation(signupSchema),asyncHandler(controller.signup))
router.post('/login',validation(signinSchema),asyncHandler(controller.login))
router.get('/confirmEmail/:token',asyncHandler(controller.confirmEmail))

export default router;