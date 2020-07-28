const { Account, Balance, sequelize } = require('../models/sequelize');
const { crudControllers } = require('./crudControllers');
const { makeSeries } = require('../scripts/dataAnalysis')

let controllers = {};

// TODO - need to generalise aggregator logic into function (may require refining Sequelize output)

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
    let values = []
    Object.keys(summed).forEach((key) => {
      dates.push(key);
      values.push(summed[key])
    })
    res.status(200).json({ dates, values });
  } catch (error) {
    return next(error);
  }
};

controllers.readCurrentAccounts = async (req, res, next) => {
  try {
    const [balances, meta] = await sequelize.query(`SELECT * FROM Balances WHERE "accountId" in (SELECT id from Accounts WHERE "userId" = 1 AND "accountType" = 'current')`)

    if (balances.length === 0) {
      return res.status(400).end();
    }

    let summed = {}
    balances.forEach((balance) => {
      let date = balance.date;
      summed[date] = (summed[date] || 0 ) + Number(balance.balance);
    })
    let dates =[]
    let values = []
    Object.keys(summed).forEach((key) => {
      dates.push(key);
      values.push(summed[key])
    })
    res.status(200).json({ dates, values });
  } catch (error) {
    return next(error);
  }
}

module.exports = controllers;