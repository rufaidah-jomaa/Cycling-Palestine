import { Router } from "express";
import * as controller from './track.controller.js'
import participatingRouter from '../participating/participating.router.js'
import { asyncHandler } from "../../services/errorHandling.js";
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./track.role.js";
import uploadFile, { fileType } from "../../services/multer.js";
import validation from "../../middleware/validation.middleware.js";
import * as schema from './track.validation.js'
const router  = Router();

router.use('/:t_id/participating',participatingRouter)
router.post('/',auth(endPoints.add),validation(schema.addTrackSchema),asyncHandler(controller.addTrack))
router.patch('/updateTrack/:id',auth(endPoints.update),validation(schema.updateTrackSchema),asyncHandler(controller.updateTrack))
router.get('/allTracks',asyncHandler(controller.getTracks))
router.get('/getDetails/:id',validation(schema.getDetailsSchema),asyncHandler(controller.getDetails))
router.get('/byDate/data',auth(endPoints.getbydate),asyncHandler(controller.getByDate))
router.get('/byName/:name',auth(endPoints.getbyname),asyncHandler(controller.getByName))
router.delete('/delete/:id',auth(endPoints.delete),validation(schema.deleteTrackSchema),asyncHandler(controller.deleteTrack)) 
router.patch('/like/:id',auth(endPoints.like),validation(schema.likeTrackSchema),asyncHandler(controller.likeTrack))
router.post('/comment/:id',uploadFile(fileType.image).single('image'),validation(schema.createCommentSchema),auth(endPoints.comment),asyncHandler(controller.createComment))
export default router;