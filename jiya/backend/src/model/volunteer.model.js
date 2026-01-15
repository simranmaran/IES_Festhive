import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  assignedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  role: { type: String, default: "volunteer" },
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;
