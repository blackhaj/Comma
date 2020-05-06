const { Account } = require('../models/sequelize');
const { crudControllers } = require('./crudControllers');


module.exports = crudControllers(Account);
