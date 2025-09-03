import { db } from "../db/connection.js";

export const findUser = (req, res) => {
  let sql = `SELECT * FROM users WHERE id = ?`;

  db.query(sql, req.params.userId, (error, data) => {
    if (error) return res.status(500).json(error);

    const { password, ...userInfo } = data[0];
    return res.status(200).json({ userInfo });
  });
};

export const updateUser = (req, res) => {
  const { name, city, website, profilePic, coverPic } = req.body;
  let sql = `UPDATE users SET name=?, city=?, website=?, profilePic=?, coverPic=? WHERE id = ?`;
  let values = [name, city, website, profilePic, coverPic, req.params.userId];

  db.query(sql, values, (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.affectedRows > 0)
      return res.status(200).json({ message: "updated successfully" });
    res.status(400).json({ message: "not updated" });
  });
};
