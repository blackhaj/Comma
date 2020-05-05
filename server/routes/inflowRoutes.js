const express = require('express');
const router = express.Router();
const inflowController = require('../controllers/inflowController');


// id: INTEGER,
// date: type.DATEONLY,
// amount: type.DECIMAL,
// category: ['income', 'one-off']
// deleted: BOOLEAN,

router.post('/new',
  inflowController.createInflow,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

router.get('/:id',
  inflowController.readInflow,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

router.post('/:id',
inflowController.updateInflow,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

router.delete('/:id',
  inflowController.deleteInflow,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

module.exports = router;
