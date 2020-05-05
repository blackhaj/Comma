const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

router.post('/new',
  balanceController.createBalance,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

// GET users/:id 
router.get('/:id',
  balanceController.readBalance,
  (req, res) => {
    res.set(200).json(res.locals.balance);
  },
);

// POST users/:id
router.post('/:id',
  balanceController.updateBalance,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

// DELETE users/:id
router.delete('/:id',
  balanceController.deleteBalance,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

module.exports = router;
