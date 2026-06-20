import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Client Dashboard - Get user's booked tasks
router.get("/client", protect(["client"]), async (req, res) => {
  try {
    const tasks = await Task.find({
      clientId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      tasks,
      stats: {
        totalTasks: tasks.length,
        bookedCount: tasks.filter(
          (t) => t.status === "booked" || t.status === "accepted"
        ).length,
        inProgressCount: tasks.filter(
          (t) => t.status === "in_progress"
        ).length,
        completedCount: tasks.filter(
          (t) => t.status === "completed"
        ).length,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

// Tasker Dashboard - Get available and assigned tasks
router.get("/tasker", protect(["tasker"]), async (req, res) => {
  try {
    const availableTasks = await Task.find({
      status: "booked",
      assignedTaskerId: null,
    })
      .sort({ createdAt: -1 })
      .lean();

    const assignedTasks = await Task.find({
      assignedTaskerId: req.user.id,
      status: { $ne: "cancelled" },
    })
      .sort({ createdAt: -1 })
      .lean();

    const stats = {
      pendingRequests: availableTasks.length,
      acceptedTasks: assignedTasks.filter((t) => t.status === "accepted").length,
      inProgressTasks: assignedTasks.filter((t) => t.status === "in_progress")
        .length,
      completedTasks: assignedTasks.filter((t) => t.status === "completed")
        .length,
    };

    res.json({ availableTasks, assignedTasks, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Dashboard - Get system statistics
router.get("/admin", protect(["admin"]), async (req, res) => {
  try {
    const tasks = await Task.find().lean();
    const stats = {
      totalTasks: tasks.length,
      bookedCount: tasks.filter((t) => t.status === "booked").length,
      inProgressCount: tasks.filter((t) => t.status === "in_progress").length,
      completedCount: tasks.filter((t) => t.status === "completed").length,
    };

    res.json({ tasks, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
