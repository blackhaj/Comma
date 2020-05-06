const { Account } = require("../models/sequelize");

const accountController = {};

// ACCOUNTS
// accounts/ - list of all accounts (GET)
// accounts/new - create a new account (GET = form, POST = action)
// accounts/:id  - view or update an account (GET - view, POST - update, DELETE - delete)

// accountName: STRING
// interestRate: DECIMAL,
// accountType: ['current', 'savings', 'investment'],
// isin: STRING,
// assetClass: ['shares', 'bonds', 'cash'],

// CREATE a new Account
accountController.createAccount = async (req, res, next) => {
  try {
    // Try creating the users with the body of the request
    const { id, ...account } = req.body;
    await Account.create({
      ...account,
      deleted: false,
    });
    res.locals.message = 'Account Added';
    return next();
    // Throw error is fails
  } catch (error) {
    return next(error);
  }
};

// READ an account
accountController.readAccount = async (req, res, next) => {
  console.log("IN ACCOUNT - USER BELOW");
  console.log(req.user);
  try {
    const account = await Account.findOne({
      where: {
        id: req.params.id,
        deleted: false,
      },
      attributes: {
        exclude: ["id", "deleted", "createdAt", "updatedAt"],
      },
    });
    res.locals.account = account.dataValues;
    return next();
  } catch (error) {
    return next(error);
  }
};

// UPDATE an account
accountController.updateAccount = async (req, res, next) => {
  const { id, ...props } = req.body;
  try {
    await Account.update(props, {
      where: {
        id: req.params.id,
      },
    });
    res.locals.message = "Account updated"
    return next();
  } catch (error) {
    return next(error);
  }
};

// DELETE an Account
accountController.deleteAccount = async (req, res, next) => {
  try {
    await Account.update({deleted: true}, {
      where: {
        id: req.params.id,
      },
    });
    res.locals.message = "Account deleted"
    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = accountController;

// TODO
// - finish the Update controller
// - do the delete controller (don't actually delete)

// QUESTIONS
// Should I be validation the data that comes in? If so, how?
