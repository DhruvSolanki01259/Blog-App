import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/responseHandler.js";

const generateSlug = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const getBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return errorHandler(res, 404, "User Not Found");
    if (user.role !== "admin")
      return errorHandler(res, 403, "Access Denied - Admins Only");

    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Blogs fetched",
      blogs,
    });
  } catch (error) {
    console.error("Get Blogs Error:", error);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, image, category, isFeatured } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return errorHandler(res, 404, "User Not Found");
    if (user.role !== "admin")
      return errorHandler(res, 403, "Access Denied - Admins Only");

    const slug = generateSlug(title);
    const exists = await Blog.findOne({ slug });

    if (exists)
      return errorHandler(res, 400, "A blog with this title already exists");

    const blog = await Blog.create({
      userId: user._id,
      title,
      slug,
      content,
      image,
      category,
      isFeatured: Boolean(isFeatured),
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content, image, category, isFeatured } = req.body;
    const { id } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) return errorHandler(res, 404, "User Not Found");
    if (user.role !== "admin")
      return errorHandler(res, 403, "Access Denied - Admins Only");

    const blog = await Blog.findById(id);
    if (!blog) return errorHandler(res, 404, "Blog Not Found");

    // Update title & slug safely
    if (title && title !== blog.title) {
      const newSlug = generateSlug(title);
      const exists = await Blog.findOne({ slug: newSlug, _id: { $ne: id } });
      if (exists)
        return errorHandler(res, 400, "Another blog already uses this title");

      blog.title = title;
      blog.slug = newSlug;
    }

    if (content) blog.content = content;
    if (category) blog.category = category;
    if (image) blog.image = image;

    if (typeof isFeatured !== "undefined")
      blog.isFeatured = Boolean(isFeatured);

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return errorHandler(res, 400, "Invalid Blog ID");

    const user = await User.findById(req.user._id);
    if (!user) return errorHandler(res, 404, "User Not Found");
    if (user.role !== "admin")
      return errorHandler(res, 403, "Access Denied - Admins Only");

    const blog = await Blog.findById(id);
    if (!blog) return errorHandler(res, 404, "Blog Not Found");

    await blog.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return errorHandler(res, 500, "Internal Server Error");
  }
};
