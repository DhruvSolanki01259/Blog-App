import { contactEmailTemplate } from "../api/email.templates.js";
import { contactEmail } from "../api/emails.js";
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

export const contactAdmin = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return errorHandler(res, 400, "All fields are required");
    }

    const emailSubject = `New Contact Message from ${name}`;
    const emailTemplate = contactEmailTemplate(name, email, message);

    await contactEmail(process.env.ADMIN_EMAIL, emailSubject, emailTemplate);

    return res.status(200).json({
      success: true,
      error: false,
      message: "Contact Email Sent Successfully!",
    });
  } catch (error) {
    console.error("Contact Error:", error.message);
    return errorHandler(res, 500, "Internal Server Error");
  }
};
