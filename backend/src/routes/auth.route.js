import { Router } from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectedRoute ,updateProfile)

router.get("/check", protectedRoute, checkAuth)

export default router;
