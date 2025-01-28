import IncomeModel from "../model/income.model.js";
import { errorHandler } from "../utils/error.js";

export const createIncome = async (req, res, next) => {
  try {
    const { title, incomeSize, currencyType } = req.body;

    if (title === "" || incomeSize === "" || currencyType === "") {
      return next(errorHandler(403, "Please provide all fields"));
    }

    const now = new Date().getTime();
    const slug =
      req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "") + now;

    const newIncome = new IncomeModel({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    const createdIncome = await newIncome.save();
    res.status(201).json(createdIncome);
    console.log(createdIncome);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
