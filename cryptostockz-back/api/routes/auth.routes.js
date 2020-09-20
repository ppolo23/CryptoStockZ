/**
 * Rutas para el registro, inicio de sesion y terminacion de sesion
 * de los usuarios del sistema.
 */

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const cors = require('cors');

module.exports = function(app) {

  app.use(cors());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next();
  });

app.post(
  "/signup",
  [
  verifySignUp.checkDuplicateUsernameOrEmail,
  verifySignUp.checkRolesExisted
  ],
  controller.signup
);

app.post("/signin", controller.signin);

app.post("/signout", controller.signout);
};