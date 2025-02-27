import ReviewModel from "../model/review.model.js";
import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      return next(errorHandler(403, "All Fields are required"));
    }
    if (!req.user) {
      return next(errorHandler(401, "Unauthorise"));
    }

    const user = await User.findById(req.user.id);

    const newReview = new ReviewModel({
      content,
      username: user.username,
      likes: [],
      numberOfLikes: 0,
    });
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $set: {
        numberOfReview: user.numberOfReview + 1,
      },
    });

    const { password, ...rest } = updatedUser._doc;
    const createdReview = await newReview.save();
    res.status(201).json({ createdReview, rest });
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit) || 5;
    const reviews = await ReviewModel.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
