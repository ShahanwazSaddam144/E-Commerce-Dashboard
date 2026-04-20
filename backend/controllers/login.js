const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const login = require("../middleware/login");

dotenv.config();

const EMAIL = process.env.LOGIN_MAIL;
const PASS = process.env.LOGIN_PASS;
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (email !== EMAIL || password !== PASS) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/"
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/dashboard", login, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to dashboard",
    user: req.user,
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  });
  return res.status(200).json({
    success: true,
    message: "Logout Successful"
  });
});


module.exports = router;
