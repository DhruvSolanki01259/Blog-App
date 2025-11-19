import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/responseHandler.js";

export const getBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return errorHandler(res, 404, "User not Found");
    }

    if (user.role !== "admin") {
      return errorHandler(res, 403, "Access Denied - Admins Only");
    }

    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      error: false,
      message: "Blogs Fetched Successfully",
      blogs,
    });
  } catch (error) {
    console.error("Get Blogs Error:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, image, category, isFeatured } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return errorHandler(res, 404, "User Not Found");
    }

    if (user.role !== "admin") {
      return errorHandler(res, 403, "Access Denied - Admins Only");
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return errorHandler(res, 400, "A blog with this title already exists");
    }

    const blog = new Blog({
      userId: user._id,
      title,
      slug,
      content,
      image,
      category,
      isFeatured,
    });

    await blog.save();

    return res.status(201).json({
      success: true,
      error: false,
      message: "Blog created successfully!",
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content, image, category, isFeatured } = req.body;
    const { id } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) {
      return errorHandler(res, 404, "User Not Found");
    }

    if (user.role !== "admin") {
      return errorHandler(res, 403, "Access Denied - Admins Only");
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return errorHandler(res, 404, "Blog Not Found");
    }

    if (title) {
      const newSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const slugExists = await Blog.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });
      if (slugExists) {
        return errorHandler(res, 400, "Another blog already uses this title");
      }

      blog.title = title;
      blog.slug = newSlug;
    }

    if (content) blog.content = content;
    if (image) blog.image = image;
    if (category) blog.category = category;
    if (isFeatured) blog.isFeatured = isFeatured;

    await blog.save();
    return res.status(200).json({
      success: true,
      error: false,
      message: "Blog Updated Successfully!!!",
      blog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, "Invalid Blog ID");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return errorHandler(res, 404, "User Not Found");
    }

    if (user.role !== "admin") {
      return errorHandler(res, 403, "Access Denied - Admins Only");
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return errorHandler(res, 404, "Blog Not Found");
    }

    await blog.deleteOne();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Blog Deleted Successfully!!!",
    });
  } catch (error) {
    console.error("Delete Blog Error:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};
