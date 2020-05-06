const express = require('express');
const router = express.Router();
const controllers = require('../controllers/inflowController');

// inflow/
router
  .route('/')
  .get(controllers.readMany)
  .post(controllers.createOne);

// inflow/:id
router
  .route('/:id')
  .get(controllers.readOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = router;
