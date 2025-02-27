import { Schema, model } from "mongoose";

const reviewSchema = Schema(
  {
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReviewModel = new model("Review", reviewSchema);
export default ReviewModel;
