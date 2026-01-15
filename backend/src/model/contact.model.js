import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // ✅ Correct Placement of timestamps
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
