import { Router } from "express";

import {
  createLegacy,
  getAllLegacies,
  getLegacyByUserId,
  updateLegacy,
  deleteLegacy,
} from "../controllers/legacy.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createLegacy); // Create legacy data
router.get("/", getAllLegacies); // Fetch all legacy data
router.get("/:userId", getLegacyByUserId); // Fetch legacy by user ID
router.put("/:userId", updateLegacy); // Update legacy by user ID
router.delete("/:userId", deleteLegacy); // Delete legacy by user ID

export default router;
