import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Tasker from "../models/Tasker.js";
import User from "../models/User.js";

const router = express.Router();

// DEFAULT ADMIN
const ADMIN_EMAIL = "admin@taskiva.com";
const ADMIN_PASSWORD = "admin@903460";


// =================Tasker REGISTER =================
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    aadhaar,
    password,
    role,
  } = req.body;

  try {
    // Check existing tsker
    const existingTasker = await Tasker.findOne({ email });

    if (existingTasker) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    let user;

    if (role === "tasker") {

      user = await Tasker.create({
        name,
        email,
        phone,
        address,
        aadhaar,
        password: hashed,
        role,
      });

    } else {

      user = await User.create({
        name,
        email,
        password: hashed,
        role,
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Response
    res.status(201).json({
      token,

      // MongoDB ID
      id: user._id,

      // Custom ID
      customId: user.customId,

      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      aadhaar: user.aadhaar,

      role: user.role,

      taskerType: user.taskerType,
      taskerApprovalStatus: user.taskerApprovalStatus,
      taskerRejectionMessage: user.taskerRejectionMessage,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ADMIN LOGIN
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {

      const token = jwt.sign(
        {
          role: "admin",
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.json({
        token,
        role: "admin",
        email,
        customId: "ADM-0001",
      });
    }

    // Find user
    let user =
      await User.findOne({ email }) ||
      await Tasker.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Block banned/deleted taskers from logging in
    if (
      user.role === "tasker" &&
      (
        user.taskerApprovalStatus === "banned" ||
        user.taskerApprovalStatus === "deleted" ||
        user.isActive === false
      )
    ) {
      return res.status(403).json({
        message:
          user.accountMessage ||
          "Your account has been disabled by the administrator.",
      });
    }



    // Check password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Response
    res.json({
      token,

      // MongoDB ID
      id: user._id,

      // Custom ID
      customId: user.customId,

      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      aadhaar: user.aadhaar,

      role: user.role,

      taskerType: user.taskerType,
      taskerApprovalStatus: user.taskerApprovalStatus,
      taskerRejectionMessage: user.taskerRejectionMessage,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;