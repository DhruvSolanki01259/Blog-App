import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/blogs", verifyToken, getBlogs);
router.post("/blogs/create", verifyToken, createBlog);
router.put("/blogs/update/:id", verifyToken, updateBlog);
router.delete("/blogs/delete/:id", verifyToken, deleteBlog);

export default router;
