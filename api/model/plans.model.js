import { Schema, model } from "mongoose";

const plansSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      // required: true,
      min: 1,
    },
    incomeId: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Plans = new model("Plan", plansSchema);
export default Plans;
