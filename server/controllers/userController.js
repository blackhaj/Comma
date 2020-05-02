const { User } = require('../models/sequelize');

const userController = {};

// USER SCHEMA
// {
//   email: STRING,
//   password: STRING,
//   dob: DATEONLY, (format 1999-01-08)
//   targetRetirementAge: DATEONLY,
// };


// CREATE a new User
userController.createUser = async (req, res, next) => {
  try {
    // Try creating the users with the body of the request
    await User.create(req.body);
    return next();
    // Throw error is fails
  } catch (error) {
    return next(error);
  }
};

// READ a user
userController.readUser = async (req, res, next) => {
  try {
    // Try finding non-deleted user using the ID from url
    const user = await User.findOne({
      where: {
        id: req.params.id,
        deleted: false,
      },
      // Only send back required information
      attributes: {
        exclude: ['id', 'password', 'deleted', 'createdAt', 'updatedAt'],
      },
    });
    res.locals.user = user.dataValues;
    return next();
    // Throw error if not found or fails
  } catch (error) {
    return next(error);
  }
};

// UPDATE a user
// userController.updateUser = async (req, res, next) => {
//   try {
//     // Try finding non-deleted user using the ID from url
//     const user = await User.findOne({
//       where: {
//         id: req.params.id,
//         deleted: false,
//       },
//       // Only send back required information
//       attributes: {
//         exclude: ['id', 'password', 'deleted', 'createdAt', 'updatedAt'],
//       },
//     });
//     res.locals.user = user.dataValues;
//     return next();
//     // Throw error if not found or fails
//   } catch (error) {
//     return next(error);
//   }
// };

module.exports = userController;

// TODO
// - finish the Update controller
// - do the delete controller (don't actually delete)

// QUESTIONS
// Should I be validation the data that comes in? If so, how?
