import express from "express";
import { findUser, updateUser } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/find/:userId", findUser);
router.post("/update/:userId", verifyToken, updateUser);

export default router;
