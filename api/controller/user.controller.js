import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../model/user.model.js";
import ReviewModel from "../model/review.model.js";

export const updateUser = async (req, res, next) => {
  try {
    const user = req.user.id;
    const currentUser = await User.findById(user);
    if (user !== req.params.userId) {
      return next(errorHandler(403, "You are not allowed to update this user"));
    }
    if (req.body.password) {
      if (req.body.password.length < 5) {
        return next(errorHandler(403, "Password is too short!"));
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
      if (req.body.username.length < 5 || req.body.username.length > 20) {
        return next(
          errorHandler(403, "username should be between 5 and 15 characters")
        );
      }
      if (req.body.username.includes(" ")) {
        return next(errorHandler(403, "username should not contain space"));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(403, "username can only contain letters and numbers")
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    await ReviewModel.updateMany(
      { username: user.username },
      {
        $set: {
          username: req.body.username,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
