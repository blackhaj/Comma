const { Inflow } = require("../models/sequelize");
const { crudControllers } = require('../controllers/crudControllers');

module.exports = crudControllers(Inflow);
