import express from "express";
import { getChats } from "../controllers/chat.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getChats);

export default router;