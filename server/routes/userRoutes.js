const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// USERS

// POST users/signup - create a new user in the db (GET = signup form, POST = carry out action)
router.post('/signup',
  userController.createUser,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

// GET users/:id 
router.get('/:id',
  userController.readUser,
  (req, res) => {
    res.set(200).json({ ...res.locals.user});
  },
);

// POST users/:id
router.post('/:id',
  userController.updateUser,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

// DELETE users/:id
router.delete('/:id',
  userController.deleteUser,
  (req, res) => {
    res.set(200).json(res.locals);
  },
);

// users/:id - read the user details (GET = view, POST = send info for update, DELETE = delete data)


module.exports = router;
