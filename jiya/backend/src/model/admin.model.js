import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, // Ensure "name" is required
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  }, // Default role as admin
});

const admins = mongoose.model("Admin", adminSchema);

export default admins;
