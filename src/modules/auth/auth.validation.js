import joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const signupSchema={
   body:joi.object({
    userName:joi.string().min(3).max(20).required(),
    email: generalValidation.email,
    password: generalValidation.password,
    cPassword: joi.valid(joi.ref('password')).required()
}),
query:joi.object({
    test:joi.boolean().required()
})
}

export const signinSchema=joi.object({
   
    email: generalValidation.email,
    password: generalValidation.password

})