import { Router } from "express";
import * as controller from './track.controller.js'
import participatingRouter from '../participating/participating.router.js'
import { asyncHandler } from "../../services/errorHandling.js";
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./track.role.js";
import uploadFile, { fileType } from "../../services/multer.js";
const router  = Router();

router.use('/:t_id/participating',participatingRouter)
router.post('/',asyncHandler(controller.addTrack))
router.get('/allTracks',asyncHandler(controller.getTracks))
router.get('/getDetails/:id',asyncHandler(controller.getDetails))
router.get('/byDate/data',auth(endPoints.getbydate),asyncHandler(controller.getByDate))
router.get('/byName/:name',auth(endPoints.getbyname),asyncHandler(controller.getByName))
router.patch('/like/:id',auth(endPoints.like),asyncHandler(controller.likeTrack))
router.post('/comment/:id',auth(endPoints.comment),uploadFile(fileType.image).single('image'),asyncHandler(controller.createComment))
export default router;