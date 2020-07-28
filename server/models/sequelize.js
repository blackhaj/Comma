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

User.prototype.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // return statement needed!
};

const Account = AccountModel(sequelize, Sequelize);
const Balance = BalanceModel(sequelize, Sequelize);
const Inflow = InflowModel(sequelize, Sequelize);
const Transfer = TransferModel(sequelize, Sequelize);

// sequelize.sync({force: true})
//   .then(() => {
//     console.log('DB up to date');
//   });


module.exports = {
  User,
  Account,
  Balance,
  Inflow,
  Transfer,
  sequelize,
};


// TODO

// Need a sessions DB?


// RESOURCES:
// Best - https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz
// Sequelize docs - https://sequelize.org/master/manual/getting-started.html
// https://github.com/sequelize/express-example
// https://stackabuse.com/using-sequelize-orm-with-nodejs-and-express/
