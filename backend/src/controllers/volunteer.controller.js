import Volunteer from "../model/volunteer.model.js";

//  Register a volunteer (Public)
export const registerVolunteer = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const existing = await Volunteer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Volunteer already exists" });
    }

    const volunteer = new Volunteer({ name, email, phone });
    await volunteer.save();

    res.status(201).json({ message: "Volunteer registered successfully", volunteer });
  } catch (error) {
    next(error);
  }
};

//  Get all volunteers (Admin only)
export const getAllVolunteers = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find().populate("assignedEvents");
    res.status(200).json(volunteers);
  } catch (error) {
    next(error);
  }
};

//  Assign an event to a volunteer (Admin only)
export const assignEvent = async (req, res, next) => {
  try {
    const { volunteerId, eventId } = req.body;

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    if (!volunteer.assignedEvents.includes(eventId)) {
      volunteer.assignedEvents.push(eventId);
      await volunteer.save();
    }

    res.status(200).json({ message: "Event assigned to volunteer", volunteer });
  } catch (error) {
    next(error);
  }
};

// Delete a volunteer (Admin only)
export const deleteVolunteer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const volunteer = await Volunteer.findByIdAndDelete(id);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    next(error);
  }
};
