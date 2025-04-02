import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";
import express from 'express';

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

router.get("/:id", protectRoute, getMessages); // Assuming you want to get user by ID as well
export default router;

router.post("/send/:id", protectRoute, sendMessage)