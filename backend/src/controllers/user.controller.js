import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/responseHandler.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      error: false,
      message: "Blogs Fetched Successfully!!!",
      blogs,
    });
  } catch (error) {
    console.error("Get Blogs Error:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const getSlugBlogs = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return errorHandler(res, 404, "Blog Not Found");
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Slug Blog Fetched Successfully!!!",
      blog,
    });
  } catch (error) {
    console.error("Get Slug Blogs Error:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const editProfile = async (req, res) => {
  try {
    const { bio, github, linkedin, twitter, portfolio } = req.body;

    const updatedData = {};
    if (bio !== undefined) updatedData.bio = bio;
    if (github !== undefined) updatedData.github = github;
    if (linkedin !== undefined) updatedData.linkedin = linkedin;
    if (twitter !== undefined) updatedData.twitter = twitter;
    if (portfolio !== undefined) updatedData.portfolio = portfolio;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return errorHandler(res, 404, "User Not Found");
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        bio: updatedUser.bio,
        github: updatedUser.github,
        linkedin: updatedUser.linkedin,
        twitter: updatedUser.twitter,
        portfolio: updatedUser.portfolio,
      },
    });
  } catch (error) {
    console.error("Edit Profile Error:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const search = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Search query is required",
      });
    }

    const blogs = await Blog.find({
      title: { $regex: query, $options: "i" },
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      error: false,
      message: "Search Results Fetched",
      blogs,
    });
  } catch (error) {
    console.error("Search Error:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

export const advanceSearch = async (req, res) => {
  try {
    const { title, category, content, featured } = req.query;

    // Build dynamic filter object
    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };
    if (content) filter.content = { $regex: content, $options: "i" };
    if (featured === "true") filter.featured = true;
    if (featured === "false") filter.featured = false;

    // Ensure at least one filter
    if (Object.keys(filter).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one search parameter",
        blogs: [],
      });
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      blogs,
      message: "Search results fetched successfully",
    });
  } catch (err) {
    console.error("Advance Search Error:", err.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};
