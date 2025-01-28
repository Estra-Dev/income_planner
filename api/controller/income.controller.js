import IncomeModel from "../model/income.model.js";
import { errorHandler } from "../utils/error.js";

export const createIncome = async (req, res, next) => {
  try {
    const { title, incomeSize, currencyType } = req.body;

    if (title === "" || incomeSize === "" || currencyType === "") {
      return next(errorHandler(403, "Please provide all fields"));
    }

    const now = new Date().getTime();
    const currency = req.body.currency.toUpperCase();
    const slug =
      req.body.name
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "") + now;
    // const incomeAmount = req.body.incomeAmount.toFixed(2);
    // .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    const newIncome = new IncomeModel({
      ...req.body,
      slug,
      currency,
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

export const getIncome = async (req, res, next) => {
  try {
    const slug = req.params.incomeSlug;
    const income = await IncomeModel.find({ slug });
    if (!income) {
      return next(errorHandler(404, "Not found!!!"));
    }
    res.status(200).json(income);
  } catch (error) {
    next(error);
  }
};
