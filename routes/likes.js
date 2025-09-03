import express from "express";
import { disLikePost, getPostLikes, likePost } from "../controllers/like.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getPostLikes);

router.post("/add", verifyToken, likePost);

router.post("/delete", verifyToken, disLikePost);

export default router;
