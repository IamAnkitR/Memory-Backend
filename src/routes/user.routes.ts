import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getUserSettings,
  updateUserSettings,
  getUserAudios,
  getUserAudioById,
  deleteUserAudio,
  getUserActivity,
} from "../controllers/user.controllers";

const router = Router();

/** USER ROUTES */
router.get("/me", getUserProfile);
router.put("/me", updateUserProfile);
router.delete("/me", deleteUserAccount);

/** USER SETTINGS */
router.get("/settings", getUserSettings);
router.put("/settings", updateUserSettings);

/** USER AUDIOS */
router.get("/audios", getUserAudios);
router.get("/audios/:id", getUserAudioById);
router.delete("/audios/:id", deleteUserAudio);

/** USER ACTIVITY */
router.get("/activity", getUserActivity);

export default router;
