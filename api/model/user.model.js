import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 5,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      min: 5,
    },
    profilePicture: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.9lp-AzhvWVzYdKMb9E8tLQHaHs?rs=1&pid=ImgDetMain",
    },
    numberOfReview: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = new model("User", userSchema);

export default User;
