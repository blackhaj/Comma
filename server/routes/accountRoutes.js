// ACCOUNTS
// accounts/ - list of all accounts (GET)
// accounts/new - create a new account (GET = form, POST = action)
// accounts/:id  - view or update an account (GET - view, POST - update, DELETE - delete)

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/accountController');

// accounts/
router
  .route('/')
  .get(controllers.readMany)
  .post(controllers.createOne);

// accounts/:id
router
  .route('/:id')
  .get(controllers.readOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = router;
