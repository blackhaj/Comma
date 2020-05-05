const { Balance } = require("../models/sequelize");

const balanceController = {};

// date
// balance
// accountId
// userId

// CREATE a new balance
balanceController.createBalance = async (req, res, next) => {
  try {
    const { id, ...balance } = req.body;
    const newBalance = await Balance.create({
      ...balance,
      deleted: false,
    });
    res.locals = {
      message: "Balance created",
      id: newBalance.dataValues.id,
    };
    return next();
  } catch (error) {
    return next(error);
  }
};

// READ an Balance
balanceController.readBalance = async (req, res, next) => {
  try {
    const balance = await Balance.findOne({
      where: {
        id: req.params.id,
        deleted: false,
      },
      attributes: {
        exclude: ["id", "deleted", "createdAt", "updatedAt"],
      },
    });
    res.locals.balance = balance.dataValues;
    return next();
  } catch (error) {
    return next(error);
  }
};

// UPDATE an Balance
balanceController.updateBalance = async (req, res, next) => {
  const { id, ...balance } = req.body;
  try {
    await Balance.update(balance, {
      where: {
        id: req.params.id,
      },
    });
    res.locals = {message: "Balance updated"}
    return next();
  } catch (error) {
    return next(error);
  }
};

// DELETE an Balance
balanceController.deleteBalance = async (req, res, next) => {
  try {
    await Balance.update({deleted: true}, {
      where: {
        id: req.params.id,
      },
    });
    res.locals = {message: "Balance deleted"}
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = balanceController;
