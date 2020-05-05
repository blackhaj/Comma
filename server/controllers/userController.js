const { User } = require("../models/sequelize");

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
    const { id, ...user } = req.body;
    const newUser = await User.create({
      ...user,
      deleted: false,
    });
    res.locals = {
      message: "User created",
      id: newUser.dataValues.id,
    };
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
        exclude: ["id", "password", "deleted", "createdAt", "updatedAt"],
      },
    });
    res.locals.user = user.dataValues;
    return next();
    // Throw error if not found or fails
  } catch (error) {
    return next(error);
  }
};

userController.updateUser = async (req, res, next) => {
  const { id, ...props } = req.body;
  try {
    await User.update(props, {
      where: {
        id: req.params.id,
      },
    });
    res.locals.message = "User updated"
    return next();
  } catch (error) {
    return next(error);
  }
};

userController.deleteUser = async (req, res, next) => {
  try {
    await User.update({deleted: true}, {
      where: {
        id: req.params.id,
      },
    });
    res.locals.message = "User deleted"
    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = userController;

// TODO
// - finish the Update controller
// - do the delete controller (don't actually delete)

// QUESTIONS
// Should I be validation the data that comes in? If so, how?
