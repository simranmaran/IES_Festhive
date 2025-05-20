
import Event from "../model/event.model.js";

// Create Event
export const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, image } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and Date are required!" });
    }

    console.log(req.user)

    const event = new Event({
      title,
      description,
      date,
      location,
      image,
      createdBy: req.user.id,
    });

    await event.save();
    res.status(201).json({ message: "Event Created Successfully!", event });
    console.log(event)
  } catch (error) {
    next(error);
  }
};

// Update Event
export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event Not Found!" });
    }

    

    res.status(200).json({ message: "Event Updated", updatedEvent });
  } catch (error) {
    next(error);
  }
};

// Delete Event
export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Event Not Found!" });
    }

    res.status(200).json({ message: "Event Deleted" });
  } catch (error) {
    next(error);
  }
};

// Get All Events
// export const getAllEvents = async (req, res, next) => {
//   try {
//     const events = await Event.find().sort({ date: 1 });
//     res.status(200).json(events);
//   } catch (error) {
//     next(error);
//   }
// };

// Get All Events
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ events }); // ✅ fixed: wrap in { events }
  } catch (error) {
    next(error);
  }
};

