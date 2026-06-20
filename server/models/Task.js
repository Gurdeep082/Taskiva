import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    customId: String,
    title: {
      type: String,
      required: true,
    },
    description: String,
    service: {
      type: String,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientName: String,
    clientPhone: String,
    location: String,
    scheduledDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "accepted", "in_progress", "completed", "cancelled"],
      default: "booked",
    },
    budget: {
      type: Number,
      required: true,
    },
    assignedTaskerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasker",
    },
    assignedTaskerName: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
