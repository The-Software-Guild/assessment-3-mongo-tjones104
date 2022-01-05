const mongoose = require("mongoose");
const Bug = require("../models/bugs");

const URI = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
  getAll: (req, res, next) => {
    let query = req.query;
    mongoose.connect(URI, (err) => {
      if (!err) {
        if (Object.keys(query).length != 0) {
          Bug.find(query)
            .populate("assignee")
            .then((result) => {
              if (Object.keys(result).length === 0) {
                next(new Error("This query was not found"));
              } else {
                res.status(200).send(result);
              }
            })
            .catch((err) => {
              next(new Error(err));
            });
        } else {
          Bug.find()
            .populate("assignee")
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((err) => {
              next(new Error(err));
            });
        }
      } else {
        next(new Error(err));
      }
    });
  },
  getOne: (req, res, next) => {
    mongoose.connect(URI, (err) => {
      if (!err) {
        Bug.findById(req.params.id)
          .populate("assignee")
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((err) => {
            next(new Error(err));
          });
      } else {
        next(new Error(err));
      }
    });
  },
  add: (req, res, next) => {
    const payload = req.decoded;
    const assignee = payload.user._id;
    const { title, description, time, date } = req.body;
    const bug = new Bug({ title, description, time, date, assignee });

    mongoose.connect(URI, (err) => {
      if (!err) {
        if (payload.user.admin === true) {
          bug
            .save()
            .then((result) => {
              res.status(201).send(result);
            })
            .catch((err) => {
              next(new Error(err));
            });
        } else {
          next(new Error("Not Authorized "));
        }
      } else {
        next(new Error(err));
      }
    });
  },
  update: (req, res, next) => {
    mongoose.connect(URI, (err) => {
      if (!err) {
        const payload = req.decoded;
        if (payload.user.admin === true) {
          Bug.findByIdAndUpdate(req.params.id, req.body)
            .then((result) => {
              res.status(201).send(result);
            })
            .catch((err) => {
              next(new Error(err));
            });
        } else {
          next(new Error("Not Authorized "));
        }
      } else {
        next(new Error(err));
      }
    });
  },
  delete: (req, res, next) => {
    mongoose.connect(URI, (err) => {
      if (!err) {
        const payload = req.decoded;
        if (payload.user.admin === true) {
          Bug.findByIdAndDelete(req.params.id)
            .then((result) => {
              res.status(201).send(result);
            })
            .catch((err) => {
              next(new Error(err));
            });
        } else {
          next(new Error("Not Authorized "));
        }
      } else {
        next(new Error(err));
      }
    });
  },
};
