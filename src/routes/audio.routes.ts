import { Router } from "express";
import multer from "multer";
import { uploadAudio } from "../controllers/audio.controller";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("audio"), uploadAudio);
console.log("Audio routes file loaded");

export default router;