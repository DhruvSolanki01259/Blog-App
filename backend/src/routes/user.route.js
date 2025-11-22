import express from "express";
import {
  contactAdmin,
  editProfile,
  getBlogs,
  getSlugBlogs,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/blogs", getBlogs);
router.get("/blogs/:slug", getSlugBlogs);

router.post("/contact", contactAdmin);
router.put("/edit-profile", verifyToken, editProfile);

export default router;
