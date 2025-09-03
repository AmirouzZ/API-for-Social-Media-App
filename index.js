import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Routes
import userRoute from "./routes/users.js";
import likeRoute from "./routes/likes.js";
import authRoute from "./routes/auth.js";
import commentRoute from "./routes/comments.js";
import postRoute from "./routes/posts.js";
import followRoute from "./routes/follow.js";
import dotenv from 'dotenv'
dotenv.config();

// MiddleWares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

//
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/likes", likeRoute);
app.use("/api/v1/follows", followRoute);

// server connection
let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server started on port:", port);
});
