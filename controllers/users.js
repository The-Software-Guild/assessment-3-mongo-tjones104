const mongoose = require("mongoose");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const URI = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
  register: (req, res, next) => {
    mongoose.connect(URI, (err) => {
      if (!err) {
        const user = new User(req.body);
        user
          .save()
          .then((user) => {
            res.status(201).send(user);
          })
          .catch((err) => {
            next(new Error(err));
          });
      } else {
        next(new Error(err));
      }
    });
  },

  login: (req, res, next) => {
    mongoose.connect(URI, (err) => {
      let result = {};
      let { email, password } = req.body;
      if (!err) {
        User.findOne({ email }, (err, user) => {
          if (!err && user) {
            bcrypt
              .compare(password, user.password)
              .then((match) => {
                if (match) {
                  const payload = { user: user };
                  const options = {
                    expiresIn: "1d",
                    issuer: "Tristan Jones",
                  };
                  const secret = process.env.JWT_SECRET;
                  const token = jwt.sign(payload, secret, options);
                  result.token = token;
                  result.result = user;
                  res.status(200).send(result);
                } else {
                  next(new Error("Authentication error"));
                }
              })
              .catch((err) => {
                next(new Error(err));
              });
          } else {
            next(new Error(err));
          }
        });
      } else {
        next(new Error(err));
      }
    });
  },

  getAll: (req, res, next) => {
    mongoose.connect(URI, (err) => {
      if (!err) {
        const payload = req.decoded;
        if (payload.user.admin === true) {
          User.find({}, (err, users) => {
            if (!err) {
              res.status(201).send(users);
            } else {
              next(new Error(err));
            }
          });
        } else {
          next(new Error(`Authentication error`));
        }
      } else {
        next(new Error(err));
      }
    });
  },
};
