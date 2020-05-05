const { Transfer } = require("../models/sequelize");

const transferController = {};

// id: 
// accountFrom: 
// accountTo: 
// date: type.DATEONLY,
// amount: type.DECIMAL,

// CREATE a new Transfer
transferController.createTransfer = async (req, res, next) => {
  try {
    const { id, ...transfer } = req.body;
    const newTransfer = await Transfer.create({
      ...transfer,
      deleted: false,
    });
    res.locals = {
      message: "Transfer created",
      id: newTransfer.dataValues.id,
    };
    return next();
  } catch (error) {
    return next(error);
  }
};

// READ an Transfer
transferController.readTransfer = async (req, res, next) => {
  try {
    const transfer = await Transfer.findOne({
      where: {
        id: req.params.id,
        deleted: false,
      },
      attributes: {
        exclude: ["id", "deleted", "createdAt", "updatedAt"],
      },
    });
    res.locals.transfer = transfer.dataValues;
    return next();
  } catch (error) {
    return next(error);
  }
};

// UPDATE an Transfer
transferController.updateTransfer = async (req, res, next) => {
  const { id, ...transfer } = req.body;
  try {
    await Transfer.update(transfer, {
      where: {
        id: req.params.id,
      },
    });
    res.locals = {message: "Transfer updated"}
    return next();
  } catch (error) {
    return next(error);
  }
};

// DELETE an Transfer
transferController.deleteTransfer = async (req, res, next) => {
  try {
    await Transfer.update({deleted: true}, {
      where: {
        id: req.params.id,
      },
    });
    res.locals = {message: "Transfer deleted"}
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = transferController;
