import IncomeModel from "../model/income.model.js";
import Plans from "../model/plans.model.js";
import { errorHandler } from "../utils/error.js";

export const createPlan = async (req, res, next) => {
  const { name, amount } = req.body;

  if (name === "" || !name) {
    return next(errorHandler(403, "Provide name"));
  }
  if (amount === "" || !amount) {
    return next(errorHandler(403, "Provide amount"));
  }

  try {
    const income = await IncomeModel.findById(req.params.incomeId);

    if (!income) {
      return next(errorHandler(404, "Income not found"));
    }

    const newPlan = new Plans({
      ...req.body,
      incomeId: income._id,
      currency: income.currency,
    });

    const createdPlan = await newPlan.save();
    res.status(201).json(createdPlan);
  } catch (error) {
    next(error);
  }
};

export const getPlans = async (req, res, next) => {
  try {
    const incomeId = req.params.incomeId;
    const plans = await Plans.find({ incomeId: incomeId });
    if (!plans) {
      return next(errorHandler(404, "Plan not found"));
    }
    res.status(200).json(plans);
  } catch (error) {
    next(error);
  }
};
