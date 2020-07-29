const express = require('express');
const router = express.Router();
const controllers = require('../controllers/overviewController');

// overview/networth
router
  .route('/worth')
  .get(controllers.readNetWorth);

// overview/current
router
  .route('/currents')
  .get(controllers.readCurrentAccounts);

router
  .route('/latestbalances')
  .get(controllers.readLatestBalances);

router
  .route('/accountswithbalances')
  .get(controllers.readAllAccountsWithBalances);

module.exports = router;