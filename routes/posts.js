import express from "express";
import { addPost, getAllPosts, getMyPosts } from "../controllers/post.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllPosts);
router.get("/me", verifyToken, getMyPosts);

router.post("/add", verifyToken, addPost);

export default router;
