import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/client", protect(["client"]), (req, res) => {
  res.json({ message: "Client Dashboard" });
});

router.get("/tasker", protect(["tasker"]), (req, res) => {
  res.json({ message: "Tasker Dashboard" });
});

router.get("/admin", protect(["admin"]), (req, res) => {
  res.json({ message: "Admin Dashboard" });
});

export default router;
