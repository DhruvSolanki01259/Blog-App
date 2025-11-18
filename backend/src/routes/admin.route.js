import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createPost } from "../controllers/admin.controller.js";

const router = express.Router();

router.put("/create", verifyToken, createPost);

export default router;
