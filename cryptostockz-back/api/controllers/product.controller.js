var _lodash = require('lodash');

const db = require("../models");

const Product = db.product;
const BaseProduct = db.base_product;
const User = db.user;

const config = require('../../config/config');

const path = require('path');
const fs = require("fs");

getImages = (adn,level,productId) => {
    if(adn === "0"){
        adn = "0000";
    }

    let imagesPath = config.env.PRODUCT_IMAGES;


    let fondo = fs.readFileSync(path.resolve(imagesPath + '/fondos/'+ level +'.png'),{ encoding: "base64" });
    let emoji = fs.readFileSync(path.resolve(imagesPath + '/emojis/'+ adn.charAt(0) +'.png'),{ encoding: "base64" });
    let producto = fs.readFileSync(path.resolve(imagesPath + '/productos/' + productId + '/'+ (parseInt(adn.charAt(1)) % 5)+'.png'),{ encoding: "base64" });
    let accesorio = fs.readFileSync(path.resolve(imagesPath + '/accesorios/'+ (parseInt(adn.charAt(2)+''+ adn.charAt(3))%20)+'.png'),{ encoding: "base64" });
    
    return [fondo,producto,accesorio,emoji];
}

/**
 * Insercion de un nuevo producto digital en la BD
 * 
 * En la practica, esta funcion es llamada desde el front cuando
 * se recibe el evento de que se ha creado el producto en la
 * Blockchain.
 * 
 * 
 * AÑADIR PRODUCT_BASE ID EN LA BLOCKCHAIN ?¿?¿
 */
exports.createProduct = (req, res) => {
    var digitalProduct = req.body;
    console.log("Datos digital: "+req.body)
    // Buscamos que exista el producto base en nuestra base de datos
    BaseProduct.findOne({
        where: {
            id: digitalProduct.id
        }
    }).then(base_product => {
        // Comprueba que existe el producto base en nuestra base de datos
        if (!base_product) {
            return res.status(401).send({ message: "Base Product does not exist." });
        }
        // Buscamos que el owner_address sea igual al valor de la cuenta de metamask guardada.
        User.findOne({
            where: {
                metamaskAccount: digitalProduct.owner_address
            }
        }).then(owner => {
            // Comprueba que existe la cuenta en nuestra base de datos
            if (!owner) {
                return res.status(401).send({ message: "Metamask account not match." });
            }

            Product.create({
                address: digitalProduct.address,
                owner_address: digitalProduct.owner_address,
                numberOfTransactions: 1,
                dna: digitalProduct.dna,
                level: digitalProduct.level,
                uniqueIdentificator: digitalProduct.uniqueIdentificator
            }).then(product => {
                product.setBaseProductId(base_product);
                // owner.addProducts(product);
                return res.status(200).send({ message: "Digital product " + product.address + " created." });
            });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

/**
 * Ejemplo de actualizacion de un producto (revisar)
 */
exports.updateProductWithForm = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }
        var digitalProduct = req.body;

        console.log(digitalProduct);

        Product.update(digitalProduct, {
            where: {
                id: req.params.productId
            }
        }).then(() => {
            return res.status(200).send({ message: "Digital product updated." });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getAllProducts = (req, res) => {
    Product.findAll({
        include: [
          {
            model: BaseProduct, as: "BaseProductId"
          }
        ]}).then(products => {

        products.forEach((product) => {
            let productId = product.base_productId;
            let adn = product.dna.toString();
            let level = product.level;

            product.dataValues.name = product.BaseProductId.dataValues.name;
            product.dataValues.images = getImages(adn, level, productId);
        });
            return res.status(200).send({ products: products});

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getAllBaseProducts = (res) => {
    BaseProduct.findAll().then(products => {
        return res.status(200).send({ message: products})
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    });
}

exports.getProduct = (req, res) => {
    Product.findOne({
        where: {
            id: req.params.productId
        },
        include: [
            {
              model: BaseProduct, as: "BaseProductId"
            }
          ]
    }).then(product => {
        if (!product) {
            return res.status(404).send({ message: "Product Not Found" });
        }

        let productId = product.base_productId;

        let adn = product.dna.toString();
        let level =  product.level;
        product.dataValues.name = product.BaseProductId.dataValues.name;

        images = getImages(adn, level, productId);

        return res.status(200).send({ 
            product: product, 
            images: images
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.searchProduct = (req, res) => {
    console.log(req.query.baseProductId);
    var query = req.query;
    if (query.baseProductId === "" && query.manufacturerId === "") {
        BaseProduct.findAll().then(response => {
            return res.status(200).send({ message: response});
        }).catch(err => {
            return res.status(500).send({ message: err.message });
        });
    } else {
        if (query.manufacturerId !== "" && query.baseProductId !== "") {
            User.findAll({
                include: {
                    model: BaseProduct,
                    as: "BaseProducts",
                },
                where:{
                    id: query.manufacturerId,
                }
            }).then(users => {
                if (!users) {
                    return res.status(404).send({ message: "Manufacturer not found" });
                }
                // Recorremos el array de usuarios buscando el producto específico
                users.forEach(user => {
                    BaseProduct.findOne({
                        where: {
                            id: query.baseProductId
                        }
                    }).then(response => {
                        if (!response) {
                            return res.status(404).send({ message: "This product does not belong to this manufacturer" });
                        }
                        return res.status(200).send({ message: [response] });
                    }).catch(error => {
                        return res.status(500).send({ message: error });
                    });
                });
            }).catch(err => {
                return res.status(500).send({ message: err.message });
            });
        } else {
            if (query.manufacturerId !== "" && query.baseProductId === "") {
                User.findAll({
                    include: {
                        model: BaseProduct,
                        as: "BaseProducts",
                    },
                    where:{
                        id: query.manufacturerId,
                    }
                }).then(users => {
                    if (!users) {
                        return res.status(404).send({ message: "Manufacturer not found" });
                    }
                    // Buscamos todos los productos de un manufacturer
                    users.forEach(user => {
                        BaseProduct.findAll({
                            where: {
                                fk_userId: user.dataValues.id
                            }
                        }).then(response => {
                            return res.status(200).send({ message: response });
                        });
                    });
                }).catch(err => {
                    return res.status(500).send({ message: err.message });
                });
            } else if (query.manufacturerId === "" && query.baseProductId !== "") {
                BaseProduct.findOne({
                    where: {
                        id: query.baseProductId
                    }
                }).then(response => {
                    if (!response){
                        return res.status(400).send({ message: "Product not found" })
                    }
                    return res.status(200).send({ message: [response] });
                })
            } else {
                return res.status(500).send({ message: "Something was wrong, review your parameters." });
            }
        }
    }
}