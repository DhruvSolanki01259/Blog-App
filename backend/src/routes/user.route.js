import express from "express";
import {
  advanceSearch,
  editProfile,
  getBlogs,
  getSlugBlogs,
  search,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/blogs", getBlogs);
router.get("/blogs/:slug", getSlugBlogs);

router.get("/search", search);
router.get("/advance-search", advanceSearch);

router.put("/edit-profile", verifyToken, editProfile);

export default router;
