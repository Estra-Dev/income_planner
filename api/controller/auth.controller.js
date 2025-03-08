import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (
    email === "" ||
    username === "" ||
    password === "" ||
    !email ||
    !username ||
    !password
  ) {
    return next(errorHandler(403, "Provide all the required fields"));
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return next(errorHandler(403, "User already exist"));
    }
    if (password.length < 5) {
      return next(errorHandler(403, "Password is too short"));
    }
    if (username.length < 5) {
      return next(errorHandler(403, "Username is too short"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      numberOfReview: 0,
    });

    await newUser.save();
    res.status(201).json({ message: "You have been registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(403, "Provide all required fields"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "This user does not exist"));
    }

    const validUserPassword = bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!validUserPassword) {
      return next(errorHandler(403, "Access Denied, Wrong credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.SECRETE);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Signed out");
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRETE);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      const newUser = new User({
        email,
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        password: hashedPassword,
        numberOfReview: 0,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRETE);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
