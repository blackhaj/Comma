const { Account, Balance } = require('../models/sequelize');
const { crudControllers } = require('./crudControllers');
const { makeSeries } = require('../scripts/dataAnalysis')

let controllers = crudControllers(Account);

controllers.readManyBalances = async (req, res, next) => {
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
    docs = makeSeries(docs, 'date', 'balance')
    res.status(200).json({ 
      dates: docs.date,  
      values: docs.balance
    });
  } catch (error) {
    return next(error);
  }
};


module.exports = controllers;
