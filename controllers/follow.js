import { db } from "../db/connection.js";

export const getFollowersAndFollowed = (req, res) => {
  //   let sql = `SELECT l.*, u.id AS userId, name, profilePic FROM likes AS l JOIN users AS u ON (u.id = l.userId)
  //   WHERE l.postId = ?`;

  let sql = "SELECT userId FROM likes WHERE postId = ?";

  db.query(sql, [req.query.postId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data);
  });
};

export const isFollowed = (req, res) => {
  let sql = "SELECT followerUser FROM follows WHERE followedUser = ?";

  console.log(req.query);

  db.query(sql, [req.query.followedUser], (error, data) => {
    if (error) return res.status(500).json(error);

    let isFollowed = false;

    console.log(data);
    if (data.length && data[0].followerUser == req.user.id) isFollowed = true;

    return res.status(200).json({ isFollowed });
  });
};

export const follow = (req, res) => {
  let sql = `INSERT INTO follows (followerUser, followedUser) VALUES(?)`;

  let values = [req.user.id, req.query.followedUser];

  db.query(sql, [values], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json({ message: "Followed successfully" });
  });
};

export const deleteFollow = (req, res) => {
  let sql = `DELETE FROM follows WHERE  followerUser = ? AND followedUser = ?`;

  db.query(sql, [req.user.id, req.query.followedUser], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json({ message: "unfollowed successfully" });
  });
};
