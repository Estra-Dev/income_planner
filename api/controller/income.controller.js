import IncomeModel from "../model/income.model.js";
import { errorHandler } from "../utils/error.js";

export const createIncome = async (req, res, next) => {
  try {
    const { name, incomeAmount, currency } = req.body;

    if (name === "" || incomeAmount === "" || currency === "") {
      return next(errorHandler(403, "Please provide all fields"));
    }

    const now = new Date().getTime();
    const currencyType = req.body.currency.toUpperCase();
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
      currency: currencyType,
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

export const getIncomes = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const incomes = await IncomeModel.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.name && {
        $or: [{ name: { $regex: req.query.name, $options: "i" } }],
      }),
      ...(req.query.currency && {
        $or: [{ currency: { $regex: req.query.currency, $options: "i" } }],
      }),
      ...(req.query.type && {
        $or: [{ type: { $regex: req.query.type, $options: "i" } }],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalIncomes = await IncomeModel.countDocuments();

    const now = new Date();
    const sevenDaysAgo = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    );
    const lastSevenDays = await IncomeModel.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });
    res.status(200).json({ totalIncomes, lastSevenDays, incomes });
  } catch (error) {
    next(error);
  }
};
