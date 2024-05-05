import { Router } from "express";
const router  = Router();
import * as controller from './track.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import { auth } from "../../middleware/auth.middleware.js";

router.post('/',auth,asyncHandler(controller.addTrack))
router.get('/allTracks',asyncHandler(controller.getTracks))
router.get('/byDate/data',asyncHandler(controller.getByDate))
router.get('/byName/:name',asyncHandler(controller.getByName))
export default router;