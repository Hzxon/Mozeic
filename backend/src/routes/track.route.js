import { Router } from "express"
import trackController from "../controllers/track.controller.js"

const router = Router()

router.get("/:id", trackController.getTrack)

export default router