/**
 * Rutas para operaciones de los productos:
 *  - Registro de productos (solo manufacturers)
 *  - Modificacion de productos (solo manufacturers)
 *  - Busqueda de productos (solo usuarios registrados)
 *  - Marcar producto como fav/wish (solo usuarios registrados)
 */

const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");
const wishlist = require("../controllers/product.wishlist");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * Subida un producto nuevo al sistema.
     * Requiere comprobacion de rol y permisos.
     * Implica escritura en la blockchain (cryptostockz.service.js)
    */
    app.post(
        "/product",
        [authJwt.verifyToken, authJwt.isManufacturer],
        controller.createProduct
    );

    app.get(
        "/product/search",
        [authJwt.verifyToken],
        controller.searchProduct
    )

    app.get("/product",
        [authJwt.verifyToken],
        controller.getAllProducts
    );

    /**
     * Actualizacion de un producto existente.
     * Requiere comprobacion de rol y permisos.
     * Implica escritura en la blockchain (cryptostockz.service.js).
    */
    app.put(
        "/product/:productId",
        [authJwt.verifyToken, authJwt.isManufacturer],
        controller.updateProductWithForm
    );

    app.get(
        "/product/:productId",
        [authJwt.verifyToken],
        controller.getProduct
    );

    /**
     * WISHLIST
     * Incluir producto a wishlist
     * Requiere comprobacion de rol y permisos.
    */
    app.get(
        "/product/:productId/wishlist",
        [authJwt.verifyToken],
        wishlist.checkProductInWish
    );

    app.put(
        "/product/:productId/wishlist",
        [authJwt.verifyToken],
        wishlist.addProductToWishtlist
    );

    app.delete(
        "/product/:productId/wishlist",
        [authJwt.verifyToken],
        wishlist.delProductToWishtlist
    );    
    

};