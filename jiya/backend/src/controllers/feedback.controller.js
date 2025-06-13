import Feedback from "../model/feedback.model.js";

export const createFeedback = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const feedback = new Feedback({
      userId: req.user.id,
      comment,
      rating
    });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "name email");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.params.userId });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
