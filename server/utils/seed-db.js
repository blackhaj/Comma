const axios = require("axios");
const fs = require("fs");
const { User, Account, Balance } = require("../models/sequelize");

// GET USERS FROM API

// // 10 times pull down from api
// let results = [];
// let promises = [];
// for (let i = 0; i < 10; i++) {
//   promises.push(axios
//     .get("http://www.randomuser.me/api/?inc=email,login,dob"));
// }

// Promise.all(promises)
//   .then((resultsArray) => {
//     resultsArray.forEach((response) => {
//       console.log(response);
//       results.push(response.data.results[0]);
//     });
//   })
//   .then(()=> {
//     let json = JSON.stringify({users: results});
//     fs.writeFileSync('users.json', json, 'utf8', (err) => {
//       if (err) console.log(err);
//       console.log("written to file");
//     });
//   })
//   .catch((error) => console.log(error));

// // Convert User API data into right format

// let userData = JSON.parse(fs.readFileSync('users.json', 'utf8'));
// console.log(userData);

// let cleaned = userData.users.map((userObject) => {
//   return {
//     email: userObject.email,
//     password: userObject.login.password,
//     dob: userObject.dob.date,
//   }
// })

// fs.writeFileSync('cleaned.json', JSON.stringify({users: cleaned}), 'utf8', (err) => {
//   if (err) console.log(err);
//   console.log("written to file");
// });

let usersArray = [
  {
    email: "blackhaj@gmail.com",
    password: "test",
    dob: "1988-10-21",
  },
  {
    email: "allie.soto@example.com",
    password: "tommie",
    dob: "1993-09-21T11:41:08.559Z",
  },
  {
    email: "deniz.yetkiner@example.com",
    password: "jewels",
    dob: "1974-06-17T16:13:12.296Z",
  },
  // {
  //   email: "sophia.pelletier@example.com",
  //   password: "toby",
  //   dob: "1980-07-19T20:07:42.912Z",
  // },
  // {
  //   email: "rhm.hydry@example.com",
  //   password: "music1",
  //   dob: "1946-05-16T00:35:21.905Z",
  // },
  // {
  //   email: "calvin.doyle@example.com",
  //   password: "peugeot",
  //   dob: "1962-01-24T10:04:24.852Z",
  // },
  // {
  //   email: "irineu.vieira@example.com",
  //   password: "chinese",
  //   dob: "1944-09-09T23:32:37.403Z",
  // },
  // {
  //   email: "maya.freeman@example.com",
  //   password: "real",
  //   dob: "1991-01-29T17:48:46.109Z",
  // },
  // {
  //   email: "pia.kallestad@example.com",
  //   password: "fatcat",
  //   dob: "1983-05-19T08:29:01.895Z",
  // },
  // {
  //   email: "carmen.fenzl@example.com",
  //   password: "marissa",
  //   dob: "1984-07-06T15:19:22.036Z",
  // },
  // {
  //   email: "william.williams@example.com",
  //   password: "divx1",
  //   dob: "1960-07-11T14:15:43.232Z",
  // },
];

// 10 options
let currentAccounts = [
  "Lloyds",
  "Santander",
  "Bancolombia",
  "Natwest",
  "Halifax",
  "Metro",
  "Monzo",
  "Tesco",
  "Revolut",
  "TSB",
];
// 11 options
let savingAccounts = [
  { accountName: "Atom", interestRate: 2.93 },
  { accountName: "ICICI", interestRate: 2.66 },
  { accountName: "Shawbrook", interestRate: 2.62 },
  { accountName: "Virgin", interestRate: 2.09 },
  { accountName: "Moneybox", interestRate: 1.73 },
  { accountName: "Raisin", interestRate: 2.26 },
  { accountName: "Ford", interestRate: 2.31 },
  { accountName: "Chartered Savings", interestRate: 1.3 },
  { accountName: "Marcus", interestRate: 2.79 },
  { accountName: "Paragon", interestRate: 1.39 },
  { accountName: "Tesco Saver", interestRate: 1.28 },
];

// 9 options
let investmentAccounts = [
  {
    accountName: "FTSE All-World High Dividend Yield UCITS ETF (VHYL)",
    isin: "LU0321464652",
    assetClass: "bonds",
  },
  {
    accountName: "S&P 500 UCITS ETF (VUSA)",
    isin: "LU0321464652",
    assetClass: "bonds",
  },
  {
    accountName: "U.K. Inflation-Linked Gilt Index Fund - Gross Accumulation",
    isin: "IE00B4WXJK79",
    assetClass: "shares",
  },
  {
    accountName: "Pension Bee Tracker Plan",
    isin: "IE00B2NPKV68",
    assetClass: "bonds",
  },
  {
    accountName: "Legal & General Cash Trust",
    isin: "LU0641006290",
    assetClass: "bonds",
  },
  {
    accountName: "iShare Overseas Government Bond Index",
    isin: "IE00B1FZSD53",
    assetClass: "bonds",
  },
  {
    accountName: "iShare Overseas Corporate Bond Index",
    isin: "IE00B2NPKV68",
    assetClass: "bonds",
  },
  {
    accountName: "iShares Global Property Equity",
    isin: "LU0641006290",
    assetClass: "bonds",
  },
  {
    accountName: "Fidelity Index World",
    isin: "LU0321464652",
    assetClass: "shares",
  },
];

let retirementAge = [60, 65, 70];

// ONE - create all the users
// for (let i = 0; i < usersArray.length; i++) {
//   //CREATE USER
//   User.create({
//     ...usersArray[i],
//     targetRetirementAge: retirementAge[Math.floor(Math.random() * 3)],
//   });
// }

// TWO - Get all the created users
// THREE - For each User, create two Savings Accounts
// FOUR - For each User, create two Current Accounts
// FIVE - For each User, create four Investment Accounts

// User.findAll()
//   .then((response) => {
//     response.forEach(element => {
//       console.log(element.dataValues.email);
//       // Current Account:
//       for (let j = 0; j < 2; j++) {
//         // Create Current Account
//         Account.create({
//           userId: element.dataValues.id,
//           accountName: currentAccounts[Math.floor(Math.random() * 10)],
//           accountType: "current",
//         });
//       }

//       // SAVINGS Account
//       for (let j = 0; j < 2; j++) {
//         // Create Savings Account
//         let chosen = savingAccounts[Math.floor(Math.random() * 11)];
//         Account.create({
//           userId: element.dataValues.id,
//           accountName: chosen.accountName,
//           interestRate: chosen.interestRate,
//           accountType: "savings",
//         });
//       }

//       // INVESTMENT Account
//       for (let j = 0; j < 5; j++) {
//         let chosen = investmentAccounts[Math.floor(Math.random() * 9)];
//         Account.create({
//           userId: element.dataValues.id,
//           accountName: chosen.accountName,
//           accountType: "investment",
//           assetClass: chosen.assetClass,
//           isin: chosen.isin,
//         });
//       }
//     });
//   });

// // SIX - For each Account, create a balance history

// Account.findAll()
//   .then((response)=> {
//     response.forEach(element => {
//       let accountId = element.dataValues.id;
//       let userId = element.dataValues.userId;
//       let accountType = element.dataValues.accountType;
//       // Current Account
//       for (let x = 0; x < 12; x++) {
//         let balanceAmount;
//         if (accountType === 'current') {
//           balanceAmount = 1000 + 100 * x * Math.random()
//         } else if (accountType === 'savings') {
//           balanceAmount = 1000 + (100 * element.dataValues.interestRate) / 100
//         } else (
//           balanceAmount = 1000 + (100 * Math.random() * 2 - Math.random() * 100)
//         );
//         Balance.create({
//           userId: userId,
//           accountId: accountId,
//           date: `2019-${x + 1}-01`,
//           balance: balanceAmount,
//         });
//       }
//     });
//   });
