import express from "express";
import {
  follow,
  deleteFollow,
  getFollowersAndFollowed,
  isFollowed,
} from "../controllers/follow.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getFollowersAndFollowed);

router.post("/add", verifyToken, follow);

router.post("/delete", verifyToken, deleteFollow);

router.get("/check", verifyToken, isFollowed);

export default router;
