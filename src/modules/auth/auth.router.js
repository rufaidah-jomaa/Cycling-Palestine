import {Router} from 'express'
import * as controller from './auth.controller.js'
import { asyncHandler } from '../../services/errorHandling.js';
import * as schema from './auth.validation.js';
import validation from '../../middleware/validation.middleware.js';
const router=Router();

router.get('/',controller.getauth)

router.post('/signup',validation(schema.signupSchema),asyncHandler(controller.signup))
router.post('/login',validation(schema.signinSchema),asyncHandler(controller.signin))
router.get('/confirmEmail/:token',asyncHandler(controller.confirmEmail))
router.get('/newconfirmEmail/:token',asyncHandler(controller.newconfirmEmail))
router.patch('/sendCode',validation(schema.sendCodeSchema),asyncHandler(controller.sendCode))
router.patch('/forgotPassword',validation(schema.forgotPasswordSchema),asyncHandler(controller.forgotPassword))

export default router;