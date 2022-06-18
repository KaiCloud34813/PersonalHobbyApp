const mongoose = require("mongoose");
const User = mongoose.model(process.env.DB_USER_MODEL);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const signAsync = util.promisify(jwt.sign);

let register = function (req, res) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };
  const newUser = { ...req.body };

  if (!newUser.username || !newUser.password || !newUser.name) {
    _fillResponse(
      response,
      process.env.STATUS_CLIENT_ERROR,
      process.env.OBJECT_ERROR_MESSAGE
    );
    _sendResponse(res, response);
  } else {
    _hashPassword(newUser).then(() => {
      User.create(newUser)
        .then((user) =>
          _fillResponse(response, process.env.STATUS_SUCCESS, user)
        )
        .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
        .finally(() => _sendResponse(res, response));
    });
  }
};

let login = function (req, res) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };
  const credentials = { ...req.body };

  if (!credentials.username || !credentials.password) {
    _fillResponse(
      response,
      process.env.STATUS_CLIENT_ERROR,
      process.env.USER_PASS_REQ
    );
    _sendResponse(res, response);
  } else {
    User.findOne({ username: credentials.username })
      .then((user) => _validate(user, credentials))
      .then((result) => {
        if (!result.error) {
          return _generateToken(result.user);
        } else {
          return Promise.reject(process.env.USER_PASS_WRONG);
        }
      })
      .then((token) => {
        _fillResponse(response, process.env.STATUS_SUCCESS, token);
      })
      .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
      .finally(() => _sendResponse(res, response));
  }
};

const _fillResponse = function (response, status, message) {
  response.status = status;
  response.message = message;
};

const _sendResponse = function (res, response) {
  return res.status(response.status).json(response.message);
};

const _hashPassword = function (newUser) {
  return bcrypt
    .genSalt(process.env.SALT_ROUNDS)
    .then((salt) => bcrypt.hash(newUser.password, salt))
    .then((hashedPassword) => (newUser.password = hashedPassword));
};

const _validate = function (user, credentials) {
  return bcrypt.compare(credentials.password, user.password).then((valid) => {
    if (valid) {
      return Promise.resolve({ error: false, user });
    } else {
      return Promise.resolve({ error: true });
    }
  });
};

const _generateToken = function (user) {
  return signAsync(
    { username: user.username, name: user.name },
    process.env.KEY
  );
};

module.exports = { register, login };
