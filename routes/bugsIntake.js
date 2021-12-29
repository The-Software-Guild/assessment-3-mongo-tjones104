const express = require("express");
const router = express.Router();
const Bug = require("../models/bugs");

// GET w/ Query
router.get("/bugsIntake", (req, res, next) => {
  let query = req.query;
  if (Object.keys(query).length != 0) {
    Bug.find(query)
      .then((result) => {
        if (Object.keys(result).length === 0) {
          next(new Error("This query was not found"));
        } else {
          res.status(200).send(result);
        }
      })
      .catch((err) => {
        next(new Error("Bugs not found"));
      });
  } else {
    Bug.find()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        next(new Error("Bugs not found"));
      });
  }
});

// GET ONE
router.get("/bugsIntake/:id", (req, res, next) => {
  Bug.findById(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(new Error("This id was not found"));
    });
});

// POST
router.post("/bugsIntake", (req, res, next) => {
  const bug = new Bug(req.body);
  bug
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      next(new Error("Incorrect number of properties"));
    });
});

// UPDATE
router.put("/bugsIntake/:id", (req, res, next) => {
  Bug.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      next(new Error("This id was not found"));
    });
});

// DELETE
router.delete("/bugsIntake/:id", (req, res, next) => {
  Bug.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      next(new Error("This id was not found"));
    });
});

// router.get("*", (req, res, next) => {
//   next(new Error("This route was not found"));
// });

module.exports = router;
