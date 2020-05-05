// ACCOUNTS
// accounts/ - list of all accounts (GET)
// accounts/new - create a new account (GET = form, POST = action)
// accounts/:id  - view or update an account (GET - view, POST - update, DELETE - delete)

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/new',
  accountController.createAccount,
  (req, res) => {
    res.set(200).json(res.locals.message);
  },
);

// GET users/:id 
router.get('/:id',
  accountController.readAccount,
  (req, res) => {
    res.set(200).json(res.locals.account);
  },
);

// POST users/:id
router.post('/:id',
  accountController.updateAccount,
  (req, res) => {
    res.set(200).json(res.locals.message);
  },
);

// DELETE users/:id
router.delete('/:id',
  accountController.deleteAccount,
  (req, res) => {
    res.set(200).json(res.locals.message);
  },
);

module.exports = router;
