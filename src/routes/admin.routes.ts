import { Router } from "express";
import {
  getAllUsers,
  updateUserByAdmin,
  updateUserStatus,
} from "../controllers/admin.controllers";

const router = Router();

/** ADMIN ROUTES */
router.get("/users", getAllUsers);
router.put("/users/:id", updateUserByAdmin);
router.delete("/users/:id/status", updateUserStatus);

export default router;
