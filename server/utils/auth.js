const jwt = require("jsonwebtoken");
const { User } = require("../models/sequelize");
const JWT_TOKEN = process.env.JWT_TOKEN || require('../../.env.js').JWT_TOKEN;

const secrets = {
  jwtExp: "30d",
};

// Must be passed a user object with .id key
const newToken = (user) => {
  return jwt.sign({ id: user.id }, JWT_TOKEN, {
    expiresIn: secrets.jwtExp,
  }); // returns a token
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_TOKEN, (err, payload) => {
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
    },
    attributes: {
      exclude: ["deleted", "createdAt", "updatedAt"],
    },
  });
  if (!user) {
    return res.status(401).send({ message: "Not authorised" });
  }
  try {
    let match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(401).send({ message: 'Not authorised' });
    }
    const token = newToken(user.dataValues);

    // Adds to cookies - change to body + add refresh token to cookies
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
    });
    return res.status(201).send({ 
      token, 
      userId: user.dataValues.id 
    });
  } catch (error) {
    return next(error);
  }
};

const protect = async (req, res, next) => {
  // COMMENTED OUT AS USING COOKIES NOT HEADERS
  // check for authorisation header - throw error if not
  // if (!req.headers.authorization) {
  //   return res.status(401).send({ message: 'Not authorised' });
  // }
  // const token = req.headers.authorization.split('Bearer ')[1];
  // if (!token) {
  //   return res.status(401).send({ message: 'Not authorised' });
  // }

  if (req.cookies === undefined || !req.cookies.jwt) {
    return res.status(401).send({ message: 'Not authorised' });
  }
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send({ message: 'Not authorised' });
  }
  try {
    const payload = await verifyToken(token);
    const user = await User.findOne({
      where: {
        id: payload.id,
        deleted: false,
      },
      // Only send back required information
      attributes: {
        exclude: ["password", "deleted", "createdAt", "updatedAt"],
      },
    });
    req.user = user.dataValues;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'Not authorised' });
  }
};

const checkCookie = async (req, res, next) => {
  // check for authorisation header - throw error if not
  if (req.cookies === undefined || !req.cookies.jwt) {
    return res.status(401).send({ message: 'Not authorised' });
  }
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send({ message: 'Not authorised' });
  }
  try {
    const payload = await verifyToken(token);
    return res.status(201).send({ message: 'session active' });
  } catch (error) {
    return res.status(401).send({ message: 'Not authorised' });
  }
};

module.exports = {
  signUp,
  signIn,
  protect,
  checkCookie,
};
