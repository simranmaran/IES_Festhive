// src/model/event.model.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  location: String,
  image: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admins",
  },
  image: String,
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;
