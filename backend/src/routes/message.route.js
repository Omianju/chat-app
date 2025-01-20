import { Router } from "express";
import { getMessages, getUsersForSidebar } from "../controller/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/users", protectedRoute, getUsersForSidebar);
router.get("/:id", protectedRoute, getMessages)
router.post("/send/:id", protectedRoute, )

export default router;
