const jwt = require("jsonwebtoken");
const { User } = require("../models/sequelize");

const secrets = {
  jwt: "donotsharethisshitwithnoone",
  jwtExp: "30m",
};

// Must be passed a user object with .id key
const newToken = (user) => {
  return jwt.sign({ id: user.id }, secrets.jwt, {
    expiresIn: secrets.jwtExp,
  }); // returns a token
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

const signUp = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.set(400).send({ message: 'Email and password required' });
  };
  try {
    const { id, deleted, createdAt, updatedAt, ...profile} = req.body;
    const newUser = await User.create(profile);
    const token = newToken(newUser.dataValues);
    return res.set(200).send({ token });
  } catch (error) {
    return next(error);
  }
};

const signIn = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.set(400).send({ message: 'Email and password required' });
  };
  const user = await User.findOne({
    where: {
      email: req.body.email,
      deleted: false,
    }
  });
  if (!user) {
    return res.status(401).send({ message: "Not authorised" });
  }
  try {
    let match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(401).send({ message: 'Not authorised' });
    }
    let token = newToken(user.dataValues);
    return res.status(201).send({ token });
  } catch (error) {
    return next(error);
  }
};

const protect = async (req, res, next) => {
  // check for authorisation header - throw error if not
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Not authorised' });
  }
  const token = req.headers.authorization.split('Bearer ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Not authorised' });
  }
  try {
    const payload = await verifyToken(token);
    console.log("Payload: ", payload)
    const user = await User.findOne({
      where: {
        id: payload.id,
        deleted: false,
      },
      // Only send back required information
      attributes: {
        exclude: ["id", "password", "deleted", "createdAt", "updatedAt"],
      },
    });
    req.user = user.dataValues;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'Not authorised' });
  }
};

module.exports = {
  signUp,
  signIn,
  protect,
};
