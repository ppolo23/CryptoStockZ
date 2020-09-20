const { session } = require("../middleware")
const cryptostockzService = require("../services/cryptostockz.service");

exports.setStorage = (req, res) => {
  cryptostockzService.setStorage(req.body.storageAddress, req.body.cryptostockzAddress).then( result => {
    return res.status(200).send(result);
  })
};

exports.createProduct = (req, res) => {
  cryptostockzService.createProduct(
    req.body.ean,
    req.body.sku,
    req.body.name).then( result => {
    return res.status(200).send(result);
  })
};

exports.getProducts = (req, res) => {
  cryptostockzService.getProducts().then( result => {
    return res.status(200).send(result);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};