const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

// import models
const UserModel = require('./user');
const AccountModel = require('./account');
const BalanceModel = require('./balance');
const InflowModel = require('./inflow');
const TransferModel = require('./transfer');

// Instantiate the DB
const sequelize = new Sequelize('postgres://txkssrig:JkSMqInptoHlTPrtIiPUf3iMWXwWGJfy@drona.db.elephantsql.com:5432/txkssrig');

const User = UserModel(sequelize, Sequelize);
User.beforeCreate((user) => {
  return bcrypt.hash(user.password, SALT_WORK_FACTOR)
    .then((hash) => {
      user.password = hash;
    })
    .catch((error) => {
      if(error) throw Error("Error with Bcypt hashing");
    });
});

// NOT YET TESTED AS SESSIONS NOT SET UP - https://stackoverflow.com/questions/34120548/using-bcrypt-with-sequelize-model
User.prototype.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
};

const Account = AccountModel(sequelize, Sequelize);
const Balance = BalanceModel(sequelize, Sequelize);
const Inflow = InflowModel(sequelize, Sequelize);
const Transfer = TransferModel(sequelize, Sequelize);

// Accounts
User.hasMany(Account);
Account.belongsTo(User);

// Balances
User.hasMany(Balance);
Balance.belongsTo(User);
Account.hasMany(Balance);
Balance.belongsTo(Account);

// Inflows
User.hasMany(Inflow);
Inflow.belongsTo(User);
Account.hasMany(Inflow);
Inflow.belongsTo(Account);

// Transfer
User.hasMany(Transfer);
Transfer.belongsTo(User);

// sequelize.sync()
//   .then(() => {
//     console.log('DB up to date');
//   });


module.exports = {
  User,
  Account,
  Balance,
  Inflow,
  Transfer,
};


// TODO

// Need a sessions DB?


// RESOURCES:
// Best - https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz
// Sequelize docs - https://sequelize.org/master/manual/getting-started.html
// https://github.com/sequelize/express-example
// https://stackabuse.com/using-sequelize-orm-with-nodejs-and-express/

