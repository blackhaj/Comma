const express = require('express');
const router = express.Router();
const controllers = require('../controllers/overviewController');

// overview/networth --> aggregate account balance history
router
  .route('/worth')
  .get(controllers.readNetWorth);

// overview/currents --> balance history current accounts
router
  .route('/currents')
  .get(controllers.readCurrentAccounts);

// overview/latestbalances - latest balance for each account of user
router
  .route('/latestbalances')
  .get(controllers.readLatestBalances);

// overview/accountswithbalances - Details of each account, with latest balance attached
router
  .route('/accountswithbalances')
  .get(controllers.readAllAccountsWithBalances);

module.exports = router;