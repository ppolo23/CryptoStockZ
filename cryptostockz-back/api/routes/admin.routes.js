const { authJwt } = require("../middleware");
const controller = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/admin/setStorage",
    controller.setStorage
  );

  app.post(
    "/admin/createProduct",
    controller.createProduct
  );

  app.get(
    "/admin/getProduct",
    controller.getProducts
  );
};