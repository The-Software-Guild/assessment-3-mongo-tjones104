const users = require("./users");
const bugs = require("./bugs");

module.exports = (router) => {
  users(router);
  bugs(router);
  return router;
};
