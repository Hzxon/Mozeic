import { Router } from "express"
import trackController from "../controllers/track.controller.js"

const router = Router()

router.get("/:id/stream", trackController.streamTrack)

export default router