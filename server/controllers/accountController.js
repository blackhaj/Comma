const { Account, Balance } = require('../models/sequelize');
const { crudControllers } = require('./crudControllers');

let controllers = crudControllers(Account);

controllers.readManyBalances = async (req, res, next) => {
  console.log("IN READ MANY BALANCES")
  try {
    let docs = await Balance.findAll({
      where: {
        userId: req.user.id,
        accountId: req.params.id,
        deleted: false,
      },
    });
    if (docs.length === 0) {
      return res.status(400).end();
    }
    docs = docs.map(doc => doc.dataValues);
    res.status(200).json({ data: docs });
  } catch (error) {
    return next(error);
  }
};

module.exports = controllers;
