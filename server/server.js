const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Delegated Routers
const userRouter = require('./routes/userRoutes');

// Set up APP
const app = express();
const PORT = 3000;

// Global Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route delegations
app.use('/api/users', userRouter);


// Global Routes
app.get('/',
  (req, res, next) => {
    console.log('Request received');
    next();
  }
)



// API Section





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


// Global Error Handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


console.log(path.resolve(__dirname, "../controllers"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;