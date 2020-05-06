const { Balance } = require("../models/sequelize");
const { crudControllers } = require('./crudControllers');


module.exports = crudControllers(Balance);
