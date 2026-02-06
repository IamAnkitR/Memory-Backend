import { Router } from "express";
import authRoutes from "./auth.routes";
import audioRoutes from "./audio.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.use("/auth", authRoutes);
router.use("/audio", upload.single("audio"), audioRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

export default router;
