import { generateCookieAndSetToken } from "../utils/generateCookieAndSetToken.js";
import {
  errorHandler,
  serverError,
  successHandler,
} from "../utils/responseHandler.js";
import User from "../models/user.model.js";

import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password, gender } = req.body;
  try {
    if (!username || !email || !password || !gender) {
      return errorHandler(res, 400, "All fields are Required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorHandler(res, 400, "User Already Exists");
    }

    const profilePic = `${process.env.PROFILE_PICTURE_API_URL}/${gender}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic,
    });
    await user.save();
    const token = generateCookieAndSetToken(user._id, res);

    return successHandler(res, 201, "User Created Successfully", user, token);
  } catch (error) {
    console.log("Error in Sign Up: ", error.message);
    serverError(res, 500, "Internal Server Error");
    return;
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return errorHandler(res, 400, "All fields are Required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorHandler(res, 404, "User Not Found");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return errorHandler(res, 400, "Password Doesnt Matches");
    }

    const token = generateCookieAndSetToken(user._id, res);

    return successHandler(res, 200, "Logged In Successful", user, token);
  } catch (error) {
    console.log("Error in Log In: ", error.message);
    serverError(res, 500, "Internal Server Error");
    return;
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).json({
      success: true,
      error: false,
      statusCode: 200,
      message: "User Logged Out Successfully",
    });
    return;
  } catch (error) {
    console.log("Error in Log Out: ", error.message);
    serverError(res, 500, "Internal Server Error");
    return;
  }
};
