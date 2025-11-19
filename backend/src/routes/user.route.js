import express from "express";
import { editProfile, getBlogs } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/blogs", verifyToken, getBlogs);
router.put("/edit-profile", verifyToken, editProfile);

export default router;
