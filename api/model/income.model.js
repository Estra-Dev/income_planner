import { Schema, model } from "mongoose";

const incomeSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    incomeSize: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      default: "Monthly",
    },
    currencyType: {
      type: String,
      default: "USD",
    },
    balance: {
      type: Number,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

const IncomeModel = new model("Model", incomeSchema);
export default IncomeModel;
