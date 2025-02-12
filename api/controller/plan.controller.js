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
      incomeSlug: income.slug,
      currency: income.currency,
    });
    await IncomeModel.findByIdAndUpdate(income._id, {
      $set: {
        balance: income.balance - req.body.amount,
      },
    });

    const createdPlan = await newPlan.save();
    res.status(201).json(createdPlan);
  } catch (error) {
    next(error);
  }
};

export const getPlans = async (req, res, next) => {
  try {
    // const incomeId = req.params.incomeId;

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    // if (!plans) {
    //   return next(errorHandler(404, "Plan not found"));
    // }
    const plans = await Plans.find({
      ...(req.query.planId && { _id: req.query.planId }),
      ...(req.query.incomeId && { incomeId: req.query.incomeId }),
      ...(req.query.name && {
        $or: [{ name: { $regex: req.query.name, $options: "i" } }],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    res.status(200).json(plans);
  } catch (error) {
    next(error);
  }
};

export const deletePlan = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "You are not allowed to delete this Plan"));
    }
    const plan = await Plans.findById(req.params.planId);

    if (!plan) {
      return next(errorHandler(403, "Plan does not exist"));
    }
    const income = await IncomeModel.findById(plan.incomeId);

    await Plans.findByIdAndDelete(req.params.planId);
    await IncomeModel.findByIdAndUpdate(income._id, {
      $set: {
        balance: income.balance + plan.amount,
      },
    });
    res.status(200).json("Deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const editPlan = async (req, res, next) => {
  try {
    const plan = await Plans.findById(req.params.planId);
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "You are not allowed to edit this Plan"));
    }
    if (!plan) {
      next(errorHandler(404, "Plan does not exist"));
    }

    const income = await IncomeModel.findById(plan.incomeId);

    const edited = await Plans.findByIdAndUpdate(
      req.params.planId,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          amount: req.body.amount,
        },
      },
      { new: true }
    );
    if (req.body.amount) {
      await IncomeModel.findByIdAndUpdate(income._id, {
        $set: {
          balance:
            req.body.amount > plan.amount
              ? income.balance - (req.body.amount - plan.amount)
              : income.balance + (plan.amount - req.body.amount),
        },
      });
    }
    res.status(200).json(edited);
  } catch (error) {
    next(error);
  }
};
