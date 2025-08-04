import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar); // to see the users on the sidebar
router.get("/:id", protectRoute, getMessages); // user_id we'd like to fetch our messages with / /:id is a dynamic value

router.post("/send/:id", protectRoute, sendMessage); // To send messages

export default router;
