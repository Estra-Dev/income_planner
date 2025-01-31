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
    console.log(rest);
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
