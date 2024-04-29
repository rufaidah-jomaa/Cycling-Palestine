import { Router } from "express";
const router  = Router();
import * as controller from './track.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";

router.post('/',asyncHandler(controller.addTrack))
export default router;
router.get('/allTracks',asyncHandler(controller.getTracks))
router.get('/byDate/data',asyncHandler(controller.getByDate))
router.get('/byName/:name',asyncHandler(controller.getByName))