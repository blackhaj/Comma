const { Transfer } = require("../models/sequelize");

const { crudControllers } = require('../controllers/crudControllers');

module.exports = crudControllers(Transfer);
