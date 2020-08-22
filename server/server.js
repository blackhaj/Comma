const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

// Delegated Routers
const accountRouter = require("./routes/accountRoutes");
const balanceRouter = require("./routes/balanceRoutes");
const inflowRouter = require("./routes/inflowRoutes");
const overviewRouter = require("./routes/overviewRoutes");
const transferRouter = require("./routes/transferRoutes");
const userRouter = require("./routes/userRoutes");
const { signUp, signIn, protect, checkCookie } = require("./utils/auth");

// Set up APP
const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Route delegations
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);
app.use('/api/session', checkCookie);
app.use("/api", protect);
app.use("/api/accounts", accountRouter);
app.use("/api/balances", balanceRouter);
app.use("/api/inflows", inflowRouter);
app.use("/api/overview", overviewRouter);
app.use("/api/transfers", transferRouter);
app.use("/api/users", userRouter);


// App Routes
if (process.env.NODE_ENV === "production") {
  app.use("/build", express.static(path.join(__dirname, "../build")));
  
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


// 404 Handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
