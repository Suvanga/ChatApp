import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar } from "../controllers/message.controller.js";
import express from 'express';

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

export default router;