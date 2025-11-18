import express from "express";
import { editProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.put("/edit-profile", verifyToken, editProfile);

export default router;
