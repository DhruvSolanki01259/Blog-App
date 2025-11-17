import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    gender: {
      type: String,
      required: true,
      enum: ["boy", "girl"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profilePic: {
      type: String,
      default: "/default-avatar.png",
    },

    bio: {
      type: String,
      maxLength: 220,
      default: "",
    },

    github: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    twitter: {
      type: String,
      default: "",
      trim: true,
    },

    portfolio: {
      type: String,
      default: "",
      trim: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
