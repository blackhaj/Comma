const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// USERS

// users/signup - create a new user in the db (GET = signup form, POST = carry out action)
router.post('/signup',
  userController.createUser,
  (req, res) => {
    res.set(200).json({ message: 'User Added'});
  },
);


router.get('/:id',
  userController.readUser,
  (req, res) => {
    res.set(200).json({ ...res.locals.user});
  },
);


// users/:id - read the user details (GET = view, POST = send info for update, DELETE = delete data)


module.exports = router;
