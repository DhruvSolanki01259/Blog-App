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
    console.log("Get Blogs Error:", error.message);
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
