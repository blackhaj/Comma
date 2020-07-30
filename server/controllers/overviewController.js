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
    const userId = req.user.id;
    const [balances, meta] = await sequelize.query(`SELECT * FROM Balances WHERE "accountId" in (SELECT id from Accounts WHERE "userId" = :userId AND "accountType" = 'current')`, {
      replacements: { userId: userId }
    })

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

controllers.readLatestBalances = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [balances, meta] = await sequelize.query(`
    SELECT DISTINCT ON ("accountId") 
    "accountId", "balance", "date"
    FROM 
        balances
    WHERE
      "userId" = :userId
    ORDER BY 
        "accountId", date DESC;`,{
          replacements: {userId},
        })
    if (balances.length === 0) {
      return res.status(400).end();
    }

    res.status(200).json({ balances });
  } catch (error) {
    return next(error);
  }
};

controllers.readAllAccountsWithBalances = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [accounts, meta] = await sequelize.query(`
    SELECT accounts.*, b.balance as "latestBalance"
    FROM accounts
    LEFT JOIN (SELECT DISTINCT ON ("accountId") 
        "accountId", "balance", "date"
        FROM 
            balances
        WHERE
          "userId" = 1
        ORDER BY 
            "accountId", date DESC

    ) as b
    ON accounts.id=b."accountId"
    WHERE accounts."userId" = 1 AND accounts.deleted = false`, {
      replacements: {userId},
    })
    if (accounts.length === 0) {
      return res.status(400).end();
    }

    res.status(200).json({ accounts });
  } catch (error) {
    return next(error);
  }
};



module.exports = controllers;