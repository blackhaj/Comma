const { Inflow } = require("../models/sequelize");

const inflowController = {};

// date
// balance
// accountId
// userId

// CREATE a new Inflow
inflowController.createInflow = async (req, res, next) => {
  try {
    const { id, ...inflow } = req.body;
    const newInflow = await Inflow.create({
      ...inflow,
      deleted: false,
    });
    res.locals = {
      message: "Inflow created",
      id: newInflow.dataValues.id,
    };
    return next();
  } catch (error) {
    return next(error);
  }
};

// READ an Inflow
inflowController.readInflow = async (req, res, next) => {
  try {
    const inflow = await Inflow.findOne({
      where: {
        id: req.params.id,
        deleted: false,
      },
      attributes: {
        exclude: ["id", "deleted", "createdAt", "updatedAt"],
      },
    });
    res.locals.inflow = inflow.dataValues;
    return next();
  } catch (error) {
    return next(error);
  }
};

// UPDATE an Inflow
inflowController.updateInflow = async (req, res, next) => {
  const { id, ...inflow } = req.body;
  try {
    await Inflow.update(inflow, {
      where: {
        id: req.params.id,
      },
    });
    res.locals = {message: "Inflow updated"}
    return next();
  } catch (error) {
    return next(error);
  }
};

// DELETE an Inflow
inflowController.deleteInflow = async (req, res, next) => {
  try {
    await Inflow.update({deleted: true}, {
      where: {
        id: req.params.id,
      },
    });
    res.locals = {message: "Inflow deleted"}
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = inflowController;
