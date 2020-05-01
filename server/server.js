const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/',
  (req, res, next) => {
    console.log('Request received');
    next();
  }
)


// USERS
// users/signup - create a new user in the db (GET = signup form, POST = carry out action)
// users/:id - read the user details (GET = view, POST = send info for update, DELETE = delete data)


// ACCOUNTS
// accounts/ - list of all accounts (GET)
// accounts/new - create a new account (GET = form, POST = action)
// accounts/:id  - view or update an account (GET - view, POST - update, DELETE - delete)

// BALANCES
// balance/ - List of all
// balance/new
// balance/:id

// INFLOW
// inflow/
// inflow/new
// inflow/:id

// TRANSFER
// transfer/
// transfer/new
// transfer/:id




console.log(path.resolve(__dirname, "../controllers"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
