/**
 * Rutas para operaciones de los productos:
 *  - Registro de productos base
 *          usuario basico -> no original
 *          manufacturer -> origianl
 *  - Modificacion de productos base (solo manufacturers)
 *  - Validacion de productos base (solo manufacturers)
 */

const { authJwt } = require("../middleware");
const controller = require("../controllers/base.product.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * Registro de un producto base.
    */
    app.post(
        "/base/product",
        [authJwt.verifyToken], //Crear nueva comprobacion isUserOrManu ?¿?¿
        controller.createBaseProduct
    );

    /**
     * Verificacion de la originalidad de un producto.
     * Solo puede ser efectuado por manufacturers.
    */
    app.put(
        "/base/product/pending/:baseproduct_id",
        [authJwt.verifyToken, authJwt.isManufacturer],
        controller.verifyBaseProduct
    );

    /**
     * Obtener los productos pendientes de verificar por un manufacturer
    */
    app.get(
        "/base/product/pending",
        [authJwt.verifyToken, authJwt.isManufacturer],
        controller.getPendingBaseProducts
    );

    /** 
     * Obtener todos los productos base de un usuario
    */
    app.get(
        "/base/product",
        [authJwt.verifyToken],
        controller.getBaseProductsByUser
    );

    /** 
     * Obtener todos los productos base disponibles
    */
    app.get(
        "/base/products",
        [authJwt.verifyToken],
        controller.getBaseProducts
    );
};