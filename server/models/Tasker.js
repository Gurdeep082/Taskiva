import mongoose from "mongoose";

const TaskerSchema = new mongoose.Schema(
  {
    // Custom readable ID
    customId: {
      type: String,
      unique: true,
    },

    // Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    aadhaar: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    // User Role
    role: {
      type: String,
      enum: ["client", "tasker", "admin"],
      default: "client",
    },

    // Tasker Work Type
    taskerType: {
      type: String,
      enum: ["permanent", "freelance", null],
      default: null,
    },

    // Approval Status
    taskerApprovalStatus: {
      type: String,
      enum: ["not_applied", "pending", "approved", "rejected"],
      default: "not_applied",
    },

    // Rejection Reason
    taskerRejectionMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate custom ID before saving
// Auto-generate custom ID before saving
TaskerSchema.pre("save", async function () {

  // Skip if custom ID already exists
  if (this.customId) return;

  let prefix = "USR";

  if (this.role === "tasker") {
    prefix = "TSK";
  }

  if (this.role === "admin") {
    prefix = "ADM";
  }

  // Count users with same role
  const count = await mongoose.models.Tasker.countDocuments({
    role: this.role,
  });

  // Generate custom ID
  this.customId = `${prefix}-${1000 + count + 1}`;
});

export default mongoose.model("Tasker", TaskerSchema);