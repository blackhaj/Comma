const Sequelize = require('sequelize');
// import models
const UserModel = require('./models/user');
const AccountModel = require('./models/Account');
const BalanceModel = require('./models/balance');
const InflowModel = require('./models/inflow');
const TransferModel = require('./models/transfer');

// Instantiate the DB
const sequelize = new Sequelize('postgres://txkssrig:JkSMqInptoHlTPrtIiPUf3iMWXwWGJfy@drona.db.elephantsql.com:5432/txkssrig');

const User = UserModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
const Balance = BalanceModel(sequelize, Sequelize);
const Inflow = InflowModel(sequelize, Sequelize);
const Transfer = TransferModel(sequelize, Sequelize);




// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });