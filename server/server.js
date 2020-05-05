const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Delegated Routers
const userRouter = require('./routes/userRoutes');
const accountRouter = require('./routes/accountRoutes');
const balanceRouter = require('./routes/balanceRoutes');
const inflowRouter = require('./routes/inflowRoutes');
const transferRouter = require('./routes/transferRoutes');


// Set up APP
const app = express();
const PORT = 3000;


// Global Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Route delegations
app.use('/api/users', userRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/balances', balanceRouter);
app.use('/api/inflows', inflowRouter);
app.use('/api/transfers', transferRouter);


// 404 Handler
app.use((req, res) => {
  res.send("404: Page not found", 404);
});


// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


console.log(path.resolve(__dirname, "../controllers"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;