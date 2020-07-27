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
    res.status(200).json({ ...docs });
  } catch (error) {
    return next(error);
  }
};

controllers.readNetWorth = async (req, res, next) => {
  try {
    let balances = await Balance.findAll({
      where: {
        userId: req.user.id,
        deleted: false,
      },
    });
    if (balances.length === 0) {
      return res.status(400).end();
    }

    let summed = {}
    balances.forEach((balance) => {
      let date = balance.dataValues.date;
      summed[date] = (summed[date] || 0 ) + Number(balance.dataValues.balance);
    })

    let dates =[]
    let worth = []
    Object.keys(summed).forEach((key) => {
      dates.push(key);
      worth.push(summed[key])
    })
    res.status(200).json({ dates, worth });
  } catch (error) {
    return next(error);
  }
};

module.exports = controllers;
