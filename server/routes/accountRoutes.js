const express = require('express');
const router = express.Router();
const controllers = require('../controllers/accountController');

// accounts/
router
  .route('/')
  .get(controllers.readMany)
  .post(controllers.createOne);

// accounts/:id/balances
router
  .route('/:id/balances')
  .get(controllers.readManyBalances);

  // accounts/:id
router
  .route('/:id')
  .get(controllers.readOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = router;
