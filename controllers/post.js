import { db } from "../db/connection.js";
import moment from "moment";

export const getAllPosts = (req, res) => {
  //   const sql = "SELECT * FROM posts";
  //   const sql = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)`;
  // db.query(sql,(error, data) => {
  //   if (error) return res.status(500).json(error);
  //   return res.status(200).json({
  //     posts: data,
  //   });
  // });
  //==========================================================================================================================
  // const sql = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) JOIN relationships AS r ON (p.userId = r.followedUserId AND r.followerUserId = ?)`;
  // db.query(sql,[req.user.id], (error, data) => {
  //   if (error) return res.status(500).json(error);
  //   return res.status(200).json({
  //     posts: data,
  //   });
  // });
  //==========================================================================================================================
  const sql = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) 
  LEFT JOIN relationships AS r ON (p.userId = r.followedUser) WHERE r.followerUser = ? OR p.userId = ?
  ORDER BY p.createdAt DESC`;

  db.query(sql, [req.user.id, req.user.id], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json({
      posts: data,
    });
  });
};

export const getMyPosts = (req, res) => {
  const sql = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId =?
  ORDER BY p.createdAt DESC`;

  db.query(sql, [req.user.id], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json({
      posts: data,
    });
  });
};

export const addPost = (req, res) => {
  let { description, image } = req.body;
  let sql = `INSERT INTO posts (userId, description, image, createdAt) VALUES(?)`;
  let values = [
    req.user.id,
    description,
    image,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  ];

  db.query(sql, [values], (error, data) => {
    if (error) return res.status(500).json(error);
    return res
      .status(200)
      .json({ message: "post created", postId: data.insertId });
  });
};
