import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const signupSchema=
  Joi.object({
    userName:Joi.string().pattern(/^[a-zA-Z0-9_-]{3,20}$/).required(),
    email: generalValidation.email,
    password: generalValidation.password,
    cPassword: Joi.valid(Joi.ref('password')).required(),
    test:Joi.boolean().required()

})

export const signinSchema=Joi.object({
   
    email: generalValidation.email,
    password: generalValidation.password

})

export const sendCodeSchema= Joi.object({
    email:generalValidation.email
})

export const forgotPasswordSchema= Joi.object({

    email: generalValidation.email,
    password: generalValidation.password,
    code:Joi.string().length(6).required()
})