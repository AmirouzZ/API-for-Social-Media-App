import moment from "moment";
import { db } from "../db/connection.js";

export const getPostComments = (req, res) => {
  //   let sql = `SELECT * FROM comments WHERE postId = ?`;
  let sql = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
  WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  db.query(sql, [req.query.postId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const { description } = req.body;
  let sql = `INSERT INTO comments (description, userId, postId, createdAt) VALUES(?)`;

  let values = [
    description,
    req.user.id,
    req.query.postId,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  ];

  db.query(sql, [values], (error, data) => {
    if (error) return res.status(500).json(error);
    return res
      .status(200)
      .json({ message: "comment successfully", commentId: data.insertId });
  });
};
