import express from "express";
import { addComment, getPostComments } from "../controllers/comment.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getPostComments);

router.post("/add", verifyToken, addComment);

export default router;
