import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

//  DEFAULT ADMIN (CHANGE THESE)
const ADMIN_EMAIL = "admin@taskiva.com";
const ADMIN_PASSWORD = "admin@903460";

// register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ name, email, password: hashed, role });
    res.json(user);
  } catch {
    res.status(400).json({ message: "User exists" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //  ADMIN LOGIN (NO DB NEEDED)
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET
    );

    return res.json({
      token,
      role: "admin",
      email
    });
  }

 
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    role: user.role,
    email: user.email
  });
});

export default router;