import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "../model/admin.model.js";
import User from "../model/user.model.js";
import Contact from "../model/contact.model.js";
import Volunteer from "../model/volunteer.model.js";
import Event from "../model/event.model.js";

// Admin Signup
export const adminSignup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      const error = new Error("All Fields Are Required!");
      error.statusCode = 400;
      throw error;
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      const error = new Error("Admin already exists!");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, role });
    await admin.save();

    res.status(201).json({ message: "Admin Created Successfully!" });
  } catch (error) {
    next(error);
  }
};

// Admin Login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Login Successful!", token });
  } catch (error) {
    next(error);
  }
};

// Get All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Contacts
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Volunteers
export const getAllVolunteers = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find().populate("assignedEvents");
    if (!volunteers || volunteers.length === 0) {
      return res.status(404).json({ message: "No Volunteers Found" });
    }
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Events
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No Events Found" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
