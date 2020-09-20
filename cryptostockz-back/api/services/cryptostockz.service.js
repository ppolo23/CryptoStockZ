// lotteries.service.js

const config = require('../../config/config');
const Web3 = require('web3');

// Ethereum config
const ethereumUrl = `http://${config.eth.nodeUrl}:${config.eth.nodePort}`;
const gasLimit = config.eth.transactionOptions.gas;
const gasPrice = config.eth.transactionOptions.gasPrice;

// Service contract specs
const ContractName = config.contracts.CryptoStockZService.contractName;
const ContractAddress = config.contracts.CryptoStockZService.contractAddress;
const ContractAbi = config.contracts.CryptoStockZService.contractAbi;

// Storage contract specs
const StorageAddress = config.contracts.StockZStorage.contractAddress;
const StorageAbi = config.contracts.StockZStorage.contractAbi;

const web3 = new Web3(ethereumUrl);
const contract = new web3.eth.Contract(JSON.parse(ContractAbi), ContractAddress);

const storageContract = new web3.eth.Contract(JSON.parse(StorageAbi), StorageAddress);


//TODO
/// Añadir las llamadas al contrato

/**
 * Creates a product in the blockchain
 */
async function createProduct(ean, sku, name) {
  let res = await contract.methods.createProduct(ean, sku, name)
    .send({
      from: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
      gasLimit: gasLimit,
      gasPrice: gasPrice
    });
  console.log(res);
  return { msg: "product created" };
}

async function getProducts() {
  let res = await contract.methods.getProducts().call();
  return { msg: res };
}

/**
 * Transfers product ownership to new address
 * @param {*} receiver 
 * @param {*} productAddress 
 */
async function transferProduct(sender, receiver, productAddress) {
  let res = await contract.methods.transferProduct(
    receiver, 
    productAddress)
    .send({
      from: sender,
      gasLimit: gasLimit,
      gasPrice: gasPrice
    });
  return { msg: "product " + productAddress + " transfered to " + receiver };
}

async function setStorage(storageAddress, cryptostockzAddress) {
  let res = await contract.methods.setStockZStorage(storageAddress)
    .send({
      from: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
      gasLimit: gasLimit,
      gasPrice: gasPrice
    });

  await storageContract.methods.upgradeVersion(
    cryptostockzAddress, 
    "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
    )
    .send({
      from: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
      gasLimit: gasLimit,
      gasPrice: gasPrice
    });

  return { message: res };
}


module.exports = {
  transferProduct,
  createProduct,
  setStorage,
  getProducts
}
