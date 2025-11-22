import express from "express";
import {
  editProfile,
  getBlogs,
  getSlugBlogs,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/blogs", getBlogs);
router.get("/blogs/:slug", getSlugBlogs);

router.put("/edit-profile", verifyToken, editProfile);

export default router;
