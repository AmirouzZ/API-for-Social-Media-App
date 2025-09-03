import { db } from "../db/connection.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/generateToken.js";

export const register = (req, res) => {
  try {
    const { username, email, name, password } = req.body;

    let sql = "SELECT * FROM users WHERE email = ? and username = ?";

    db.query(sql, [email, username], (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.length)
        return res.status(400).json({ message: "Account already exists" });

      const salt = bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(password, salt);

      let sql = "INSERT INTO users (username, email, password, name) VALUES(?)";

      let values = [username, email, hashedPassword, name];
      db.query(sql, [values], (error, data) => {
        if (error) return res.status(500).json(error);
        console.log(data);
        return res
          .status(201)
          .json({ message: " user created", userId: data.insertedId });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = (req, res) => {
  const { email } = req.body;

  let sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (error, data) => {
    if (error) return res.status(500).json(error);
    if (!data.length)
      return res.status(400).json({ message: "Invalid credintial" });

    let user = data[0];
    let isPasswordMatched = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatched)
      return res.status(400).json({ message: "Invalid credintial" });

    let token = generateToken(user);

    let { password, ...others } = user;
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        others,
      });
  });
};
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({
      message: "user logged out",
    });
};
