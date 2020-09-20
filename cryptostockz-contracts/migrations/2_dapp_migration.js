const StockZStorage = artifacts.require("StockZStorage");
const CryptoStockZ = artifacts.require("CryptoStockZ");

module.exports = async function (deployer) {
  let storageInst, cryptoInst;
  const owner = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1';

  await Promise.all([
    deployer.deploy(StockZStorage, owner),
    deployer.deploy(CryptoStockZ)
  ]);

  instances = await Promise.all([
    StockZStorage.deployed(),
    CryptoStockZ.deployed()
  ])

  storageInst = instances[0];
  cryptoInst = instances[1];

  results = await Promise.all([
    cryptoInst.setStockZStorage(storageInst.address),
    storageInst.upgradeVersion(cryptoInst.address, owner)
  ]);
};
