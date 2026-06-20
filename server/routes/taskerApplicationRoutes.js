import express from "express";
import TaskerApplication from "../models/TaskerApplication.js";
import Tasker from "../models/Tasker.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const buildApplicationPayload = (user, body) => ({
  tasker: user._id,
  type: body.type || user.taskerType || "freelance",
  name: body.name || user.name,
  email: body.email || user.email,
  phone: body.phone || user.phone,
  address: body.address || user.address,
  aadhaar: body.aadhaar || user.aadhaar,
  status: "pending",
  rejectionMessage: "",
});

router.get("/mine", protect(["tasker"]), async (req, res) => {
  const user = await Tasker.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "Tasker not found" });

  const application = await TaskerApplication.findOne({ tasker: req.user.id })
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    user,
    application,
  });
});

router.post("/mine", protect(["tasker"]), async (req, res) => {
  const user = await Tasker.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "Tasker not found" });

  if (user.taskerApprovalStatus === "pending") {
    return res.status(400).json({ message: "Application already pending" });
  }

  if (user.taskerApprovalStatus === "approved") {
    return res.status(400).json({ message: "Tasker is already approved" });
  }

  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;
  user.aadhaar = req.body.aadhaar || user.aadhaar;
  user.taskerType = req.body.type || user.taskerType || "freelance";
  user.taskerApprovalStatus = "pending";
  user.taskerRejectionMessage = "";
  await user.save();

  const application = await TaskerApplication.create(
    buildApplicationPayload(user, req.body)
  );

  res.status(201).json({ user, application });
});

router.get("/admin", protect(["admin"]), async (req, res) => {
  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const applications = await TaskerApplication.find(filter)
    .sort({ createdAt: -1 })
    .lean();

  res.json(applications);
});

router.patch("/admin/:id", protect(["admin"]), async (req, res) => {
  const { status, rejectionMessage } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const application = await TaskerApplication.findById(req.params.id);
  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  application.status = status;
  application.rejectionMessage =
    status === "rejected"
      ? rejectionMessage || "Your application was rejected by admin."
      : "";
  await application.save();

  const user = await Tasker.findById(application.tasker);
  if (user) {
    user.taskerType = application.type;
    user.taskerApprovalStatus = status;
    user.taskerRejectionMessage = application.rejectionMessage;
    await user.save();
  }

  res.json({ application, user });
});
// Ban tasker
router.patch("/admin/:id/ban", protect(["admin"]), async (req, res) => {
  const tasker = await Tasker.findByIdAndUpdate(
    req.params.id,
    {
      taskerApprovalStatus: "banned",
      accountMessage: "Your account has been banned by the administrator.",
      isActive: false,
    },
    { new: true }
  );

  res.json(tasker);
});

// Soft delete tasker
router.delete("/admin/:id/delete", protect(["admin"]), async (req, res) => {
  const tasker = await Tasker.findByIdAndDelete(req.params.id);

  if (!tasker) {
    return res.status(404).json({
      message: "Tasker not found",
    });
  }

  await TaskerApplication.deleteMany({
    tasker: req.params.id,
  });

  res.json({
    message: "Tasker deleted successfully",
  });
});

export default router;
