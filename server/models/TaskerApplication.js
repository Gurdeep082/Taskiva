import mongoose from "mongoose";

const taskerApplicationSchema = new mongoose.Schema(
  {
    tasker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["permanent", "freelance"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    name: String,
    email: String,
    phone: String,
    address: String,
    aadhaar: String,
    rejectionMessage: String,
  },
  { timestamps: true }
);

export default mongoose.model("TaskerApplication", taskerApplicationSchema);
