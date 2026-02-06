import { Router } from "express";
import { uploadAudio } from "../controllers/audio.controller";

const router = Router();

router.post("/upload", uploadAudio);

export default router;
