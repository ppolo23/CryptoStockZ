const db = require("../models");

const BaseProduct = db.base_product;
const User = db.user;


/**
 * Creacion de un producto base (fisico) en la BD.
 * 
 * Cuando es creado por un manufacturer, se da por hecho que es original
 * y es marcado como tal (original = true). Además, se registra que es 
 * propiedad de ese usuario () y que es de la empresa x (user.username).
 * 
 * Por otro lado, cuando es creado por un usuario base, no se puede garantizar
 * la originalidad del producto (original = false). Sin embargo, si se sabe que
 * se trata del dueño del producto y él conoce la empresa fabricante
 * (limitar posibilidades en el front: solo manufacturers registrados).
 * Cuando el manufacturer responsable de verificar el producto lo haga, se
 * cambiará original a true.
 * 
 * 
 * 
 * TODO:
 *      Cuando un manufacturer registra productos base, debemos generar automaticamente
 *      sus correspondientes productos digitales. Inserción en la BD y en la BC.
 *      El evento de la BC informará al front de que tiene que ejecutar la peticion post /product
 * 
 *      Por otro lado, el producto digital de un producto generado por un usuario normal
 *      solo se genera cuando es verificado por un Manufacturer.
 * 
 */
exports.createBaseProduct = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }

        var authorities = [];
        user.getRoles().then(roles => {
            roles.forEach(element => {
                authorities.push(element.name);
            });

            // Si quien hace la peticion es manufacturer
            // el producto base se da de alta marcado como original
            // además, tiene la posibilidad de dar de alta varios productos
            // de una sola vez.
            if (authorities.includes("manufacturer")) {
                var baseproducts = req.body;
                console.log(req.userId);
                baseproducts.forEach(baseproduct => {
                    BaseProduct.create({
                        name: baseproduct.name,
                        ean: baseproduct.ean,
                        sku: baseproduct.sku,
                        original: true
                    }).then(baseproduct => {
                        baseproduct.setManufacturer(user);
                        user.addBaseProducts(baseproduct);
                    });
                });

                return res.status(200).send({ message: "Original base product created." });
            } else {
                // Si quien hace la peticion tiene otro rol
                // el producto queda pendiente de verificacion
                /// SE DEBERIA CREAR UN MECANISMO QUE AVISE AL MANUFACTURER
                /// DE QUE TIENE UN PRODUCTO PENDIENTE DE VERIFICAR
                console.log(req.body[0]);

                User.findOne({
                    where: {
                        id: req.body[0].manufacturer
                    }
                }).then(manufacturer => {
                    if (!manufacturer) {
                        return res.status(404).send({ message: "Manufacturer Not Found." });
                    }

                    BaseProduct.create({
                        name: req.body[0].name,
                        ean: req.body[0].ean,
                        sku: req.body[0].sku,
                        original: false
                    }).then(baseproduct => {
                        baseproduct.setManufacturer(manufacturer);
                        manufacturer.addBaseProducts(baseproduct);
                        return res.status(200).send({ message: "Base product created. Needs confirmation from manufacrurer." });
                    });
                });
            }
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

/**
 * Debe cambiar el campo "original" del producto a true
 * 
 * TODO:
 *      Añadir logica para generar el producto digital correspondiente.
 */
exports.verifyBaseProduct = (req, res) => {
    BaseProduct.findOne({
        where: {
            fk_manufacturer: req.userId,
            id: req.params.baseproduct_id
        }
    }).then(baseproduct => {
        baseproduct.update({
            original: true
        }).then(() => {
            return res.status(200).send("Product " + req.params.baseproduct_id + " verified.")
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

/**
 * Devuelve los productos de un manufacturer que tienen
 * campo original a falso. Es decir, productos suyos que 
 * han sido registrados por usuarios.
 */
exports.getPendingBaseProducts = (req, res) => {
    BaseProduct.findAll({
        where: {
            fk_manufacturer: req.userId,
            original: false
        }
    }).then(baseproducts => {
        return res.status(200).send({ products: baseproducts });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

/**
 * Devuelve todos los productos base de un usuario
 */
exports.getBaseProductsByUser = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }

        user.getBaseProducts().then(baseproducts => {
            return res.status(200).send({ products: baseproducts });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

/**
 * Devuelve todos los productos base registrados
 */
exports.getBaseProducts = (req, res) => {
    BaseProduct.findAll({
    }).then(products => {
        return res.status(200).send({ baseProducts: products });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};