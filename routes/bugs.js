const controller = require("../controllers/bugs");
const validateToken = require("../utils").validateToken;

module.exports = (router) => {
  router
    .route("/bugs")
    .get(validateToken, controller.getAll)
    .post(validateToken, controller.add);

  router
    .route("/bugs/:id")
    .get(validateToken, controller.getOne)
    .put(validateToken, controller.update)
    .delete(validateToken, controller.delete);
};
