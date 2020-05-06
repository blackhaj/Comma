const express = require('express');
const router = express.Router();
const controllers = require('../controllers/balanceController');

// balances/
router
  .route('/')
  .get(controllers.readMany)
  .post(controllers.createOne);

// balances/:id
router
  .route('/:id')
  .get(controllers.readOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = router;
