// config.js

/* eslint-disable max-len */



// TODO: Make your own configuration
module.exports = {
  env: {
    WEBAPP_URL: "http://127.0.0.1",
    WEBAPP_PORT: '10010',
    WEBAPP_SECRET: 'cryptostockz',
    WEBAPP_STATIC_FILES_UPLOAD_PATH: __dirname + '/../resources/static/assets/uploads/',
    WEBAPP_STATIC_FILES_TEMP_PATH: __dirname + '/../resources/static/assets/temp/',
    PRODUCT_IMAGES: __dirname + '/../images'
  },
  eth: {
    nodeUrl: 'localhost',
    nodePort: '8545',
    transactionOptions: {
      gas: 1160000,
      gasPrice: 0,
    },
  },
  contracts: {
    CryptoStockZService: {
      contractName: 'CryptoStockZService',
      contractAddress: '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B',
      contractAbi: '[ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "_owner", "type": "address" }, { "indexed": false, "internalType": "string", "name": "_name", "type": "string" }, { "indexed": false, "internalType": "string", "name": "_ean", "type": "string" }, { "indexed": false, "internalType": "string", "name": "_sku", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "_numberTransactions", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "dna", "type": "uint256" }, { "indexed": false, "internalType": "uint8", "name": "_level", "type": "uint8" } ], "name": "createProductEvent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "_from", "type": "address" }, { "indexed": false, "internalType": "address", "name": "_to", "type": "address" }, { "indexed": false, "internalType": "address", "name": "_idProduct", "type": "address" } ], "name": "transferTokenEvent", "type": "event" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_StockZStorageAddr", "type": "address" } ], "name": "setStockZStorage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_productTokenAddr", "type": "address" } ], "name": "setProductToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_ean", "type": "string" }, { "internalType": "string", "name": "_sku", "type": "string" }, { "internalType": "string", "name": "_name", "type": "string" } ], "name": "createProduct", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "address", "name": "_idProduct", "type": "address" } ], "name": "transferProduct", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getProducts", "outputs": [ { "internalType": "contract Product[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_idProduct", "type": "address" } ], "name": "getProductFromAddress", "outputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_idProduct", "type": "address" } ], "name": "getOwnerOfProduct", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getStorageAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getProductTokenAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalTokens", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCredentials", "outputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_owner", "type": "address" } ], "name": "getBalanceOwner", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "address", "name": "_product", "type": "address" } ], "name": "transferByRequest", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]'
    },
    StockZStorage: {
      contract: 'StockZStorage',
      contractAddress: '0xCfEB869F69431e42cdB54A4F4f105C19C080A601',
      contractAbi: '[ { "inputs": [ { "internalType": "address", "name": "_sender", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "_newVersion", "type": "address" }, { "internalType": "address", "name": "_sender", "type": "address" } ], "name": "upgradeVersion", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getProducts", "outputs": [ { "internalType": "contract Product[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract Product", "name": "_value", "type": "address" } ], "name": "setProduct", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_idProduct", "type": "address" } ], "name": "getProductToken", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_idProduct", "type": "address" }, { "internalType": "uint256", "name": "_tokenId", "type": "uint256" } ], "name": "setPositionProduct", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]'
    },
  },
};


