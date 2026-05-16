import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  customId: String,
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "client",
  },
});

export default mongoose.model("User", UserSchema);