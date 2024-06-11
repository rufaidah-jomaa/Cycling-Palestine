import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const addTrackSchema = Joi.object({
    trackName:Joi.string().required(),
    date:Joi.date().min(new Date()).required(),
    distance:Joi.number().required(),
    start_point:Joi.string().required(),
    end_point:Joi.string().required(),
    difficulty_level:Joi.string().required(),
    description:Joi.string().required(),
    maxParticipants:Joi.number().required(),
})

export const updateTrackSchema = Joi.object({
    id:generalValidation.id,
    trackName:Joi.string(),
    date:Joi.date().min(new Date()),
    distance:Joi.number(),
    start_point:Joi.string(),
    end_point:Joi.string(),
    difficulty_level:Joi.string(),
    description:Joi.string(),
    maxParticipants:Joi.number()
})

export const getDetailsSchema = Joi.object({
    id:generalValidation.id
})

export const likeTrackSchema = Joi.object({
    id:generalValidation.id
})

export const createCommentSchema = Joi.object({
    id:generalValidation.id,
    image:generalValidation.image,
    text:Joi.string()
})

export const deleteTrackSchema = Joi.object({
    id:generalValidation.id
})
