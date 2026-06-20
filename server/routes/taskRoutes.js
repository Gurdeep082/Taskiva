import express from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";
import Tasker from "../models/Tasker.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Book a new task (Client)
router.post("/book", protect(["client"]), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const task = await Task.create({
      ...req.body,
      scheduledDate: new Date(req.body.scheduledDate),
      budget: Number(req.body.budget),
      clientId: user._id,
      clientName: user.name,
      clientPhone: user.phone,
      status: "booked",
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get all booked tasks for a client (Client Dashboard)
router.get("/my-bookings", protect(["client"]), async (req, res) => {
  try {
    const tasks = await Task.find({ clientId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available tasks (Tasker Dashboard)
router.get("/available", protect(["tasker"]), async (req, res) => {
  try {
    const tasks = await Task.find({
      status: "booked",
      assignedTaskerId: null,
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get accepted/assigned tasks for a tasker
router.get("/my-tasks", protect(["tasker"]), async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTaskerId: req.user.id,
      status: { $ne: "cancelled" },
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept a task (Tasker)
router.patch("/:id/accept", protect(["tasker"]), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const tasker = await Tasker.findById(req.user.id);
    if (!tasker) {
      return res.status(404).json({ message: "Tasker not found" });
    }

    task.assignedTaskerId = req.user.id;
    task.assignedTaskerName = tasker.name;
    task.status = "accepted";
    await task.save();

    res.json({
      message: "Task accepted successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update task status
router.patch("/:id/status", protect(["tasker", "client"]), async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Validate status
    if (!["accepted", "in_progress", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    task.status = status;
    await task.save();

    res.json({
      message: "Task status updated",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks count (Admin Dashboard)
router.get("/admin/stats", protect(["admin"]), async (req, res) => {
  try {
    const pendingCount = await Task.countDocuments({ status: "booked" });
    const inProgressCount = await Task.countDocuments({ status: "in_progress" });
    const completedCount = await Task.countDocuments({ status: "completed" });
    const totalTasks = await Task.countDocuments({});

    res.json({
      pendingCount,
      inProgressCount,
      completedCount,
      totalTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks for admin
router.get("/admin/all", protect(["admin"]), async (req, res) => {
  try {
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
