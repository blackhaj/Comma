const express = require('express');
const router = express.Router();
const controllers = require('../controllers/transferController');


// transfers/
router
  .route('/')
  .get(controllers.readMany)
  .post(controllers.createOne);

// transfers/:id
router
  .route('/:id')
  .get(controllers.readOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = router;
