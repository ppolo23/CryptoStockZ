/**
 * Rutas para las operaciones de las cuentas:
 *  - Actualizar su informacion
 *  - Borrar su perfil (?)
 *  - Obtener sus productos
 *  - Obtener su lista de deseos
 */

const { authJwt } = require("../middleware");
const controller = require("../controllers/account.controller");
const wishlist = require("../controllers/product.wishlist");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/account/:username", 
    [authJwt.verifyToken],
    controller.getUserProfile
  );

  app.put(
    "/account/:username",
    [authJwt.verifyToken],
    controller.updateUser
  );

  app.delete(
    "/account/:username",
    [authJwt.verifyToken],
    controller.deleteUser
  );

  app.get(
    "/account/products/all",
    [authJwt.verifyToken],
    controller.getUserProducts
  );

  app.get(
    "/account/:username/wishlist",
    [authJwt.verifyToken],
    wishlist.getUserWishList
  );

  app.post(
    "/account/products/:productId/transfer",
    [authJwt.verifyToken],
    controller.transferProduct
  );

  app.get(
    "/manufacturers",
    [authJwt.verifyToken],
    controller.getManufacturers
  );

};