const express = require("express");
const router = express.Router();
const User = require("../models/Users");

// GET w/ Query
router.get("/usersIntake", (req, res, next) => {
  let query = req.query;
  if (Object.keys(query).length != 0) {
    User.find(query)
      .then((result) => {
        if (Object.keys(result).length === 0) {
          next(new Error("User not found"));
        } else {
          res.status(200).send(result);
        }
      })
      .catch((err) => {
        next(new Error("User not found"));
      });
  } else {
    User.find()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        next(new Error("User not found"));
      });
  }
});

// POST
router.post("/usersIntake", (req, res, next) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(new Error("Incorrect number of properties"));
    });
});

module.exports = router;
