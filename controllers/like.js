import { db } from "../db/connection.js";

export const getPostLikes = (req, res) => {
  //   let sql = `SELECT l.*, u.id AS userId, name, profilePic FROM likes AS l JOIN users AS u ON (u.id = l.userId)
  //   WHERE l.postId = ?`;

  let sql = "SELECT userId FROM likes WHERE postId = ?";

  db.query(sql, [req.query.postId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data);
  });
};

export const likePost = (req, res) => {
  let sql = `INSERT INTO likes (userId, postId) VALUES(?)`;

  let values = [req.user.id, req.query.postId];

  db.query(sql, [values], (error, data) => {
    if (error) return res.status(500).json(error);
    return res
      .status(200)
      .json({ message: "post liked successfully", likeId: data.insertId });
  });
};

export const disLikePost = (req, res) => {
  let sql = `DELETE FROM likes WHERE  userId = ? AND postId = ?`;

  db.query(sql, [req.user.id, req.query.postId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json({ message: "post disliked successfully" });
  });
};
