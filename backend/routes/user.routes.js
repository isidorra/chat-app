import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getById, searchUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/find/:id", protectRoute, getById);
router.get("/search", protectRoute, searchUsers);

export default router;