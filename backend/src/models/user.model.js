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
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-placeholder&psig=AOvVaw1t_J7MrSC-HwxiwAMXBQMx&ust=1761306014639000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNj_rbOeupADFQAAAAAdAAAAABAj",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
