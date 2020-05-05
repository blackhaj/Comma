const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

router.post('/new',
  transferController.createTransfer,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

router.get('/:id',
  transferController.readTransfer,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

router.post('/:id',
  transferController.updateTransfer,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

router.delete('/:id',
  transferController.deleteTransfer,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

module.exports = router;
