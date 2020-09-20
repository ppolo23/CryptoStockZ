import { crypto_contract_address, storage_contract_address } from '../config';
import Web3 from 'web3';
const appContractAbi = require('../contracts/CryptoStockZ.json').abi;
const storageContractAbi = require('../contracts/StockZStorage.json').abi;


/**
 * Funciones para subir de nivel un producto?¿?¿
 * Añadir al producto digital (en smart contract) un campo de wishNum
 * De manera que cuando supera ciertas barrerass va incrementando el nivel.
 * 
 * Aplicacion -> seleccionar algun elemeento de visualizacion distinto
 */

export const CreateProduct = (baseId, uniqueId) => {
    return new Promise((resolve, reject) => {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        if (!web3 || !web3.currentProvider.isMetaMask) {
            reject('No web3!');
        }

        const contract = new web3.eth.Contract(appContractAbi, crypto_contract_address);
        web3.eth.getAccounts().then(function (result) {
            var account = result[0];
            if (!account) {
                reject('No account!');
            }
            contract.methods.createProduct(baseId, uniqueId).send({
                from: account,
                gasLimit: 1160000,
                gasPrice: 0
            })
                .on('confirmation', function (confirmationNumber, receipt) {
                    resolve(confirmationNumber, receipt)
                })
                .on('receipt', function (receipt) {
                    resolve(receipt);
                })
                .on('error', function (error) {
                    reject(error)
                });
        });
    });
};

export const IncreaseProductLevel = (productAddress) => {
    return new Promise((resolve, reject) => {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        if (!web3 || !web3.currentProvider.isMetaMask) {
            reject('No web3!');
        }

        const contract = new web3.eth.Contract(appContractAbi, crypto_contract_address);
        web3.eth.getAccounts().then(function (result) {
            var account = result[0];
            if (!account) {
                reject('No account!');
            }
            contract.methods.updateProductLevel(productAddress,true).send({
                from: account,
                gasLimit: 1160000,
                gasPrice: 0
            })
                .on('confirmation', function (confirmationNumber, receipt) {
                    resolve(confirmationNumber, receipt)
                })
                .on('receipt', function (receipt) {
                    resolve(receipt);
                })
                .on('error', function (error) {
                    reject(error)
                });
        });
    });
};

export const DecreaseProductLevel = (productId) => {
    return new Promise((resolve, reject) => {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        if (!web3 || !web3.currentProvider.isMetaMask) {
            reject('No web3!');
        }

        const contract = new web3.eth.Contract(appContractAbi, crypto_contract_address);
        web3.eth.getAccounts().then(function (result) {
            var account = result[0];
            if (!account) {
                reject('No account!');
            }
            contract.methods.updateProductLevel(productId, false).send({
                from: account,
                gasLimit: 1160000,
                gasPrice: 0
            })
                .on('confirmation', function (confirmationNumber, receipt) {
                    resolve(confirmationNumber, receipt)
                })
                .on('receipt', function (receipt) {
                    resolve(receipt);
                })
                .on('error', function (error) {
                    reject(error)
                });
        });
    });
};

export const TransferProduct = (to, productAddres) => {
    return new Promise((resolve, reject) => {

        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();

        if (!web3 || !web3.currentProvider.isMetaMask) {
            reject('No web3!');
        }

        const contract = new web3.eth.Contract(appContractAbi, crypto_contract_address);
        web3.eth.getAccounts().then(function (result) {
            var account = result[0];
            if (!account) {
                reject('No account!');
            }
            contract.methods.transferProduct(to, productAddres)
                .send({
                    from: account,
                    gasLimit: 1160000,
                    gasPrice: 0
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    resolve(confirmationNumber, receipt)
                })
                .on('receipt', function (receipt) {
                    resolve(receipt);
                })
                .on('error', function (error) {
                    reject(error)
                });
        });
    });
};

export const SetStorage = () => {
    return new Promise((resolve, reject) => {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        if (!web3 || !web3.currentProvider.isMetaMask) {
            reject('No web3!');
        }

        const contract = new web3.eth.Contract(appContractAbi, crypto_contract_address);
        web3.eth.getAccounts().then(function (result) {
            var account = result[0];
            if (!account) {
                reject('No account!');
            }
            contract.methods.setStockZStorage(storage_contract_address)
                .send({
                    from: account,
                    gasLimit: 1160000,
                    gasPrice: 0
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    resolve(confirmationNumber, receipt)
                })
                .on('receipt', function (receipt) {
                    resolve(receipt);
                })
                .on('error', function (error) {
                    reject(error)
                });
        });
    });
};

export const GetStorage = () => {
    return new Promise((resolve, reject) => {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        if (!web3 || !web3.currentProvider.isMetaMask) {
            reject('No web3!');
        }

        const contract = new web3.eth.Contract(appContractAbi, crypto_contract_address);
        web3.eth.getAccounts().then(function (result) {
            var account = result[0];
            if (!account) {
                reject('No account!');
            }
            contract.methods.getStorageAddress()
                .call()
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    reject(error)
                });
        });
    });
};

export const UpgradeVersion = () => {
    return new Promise((resolve, reject) => {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        if (!web3 || !web3.currentProvider.isMetaMask) {
            reject('No web3!');
        }

        const storageContract = new web3.eth.Contract(storageContractAbi, storage_contract_address);
        web3.eth.getAccounts().then(function (result) {
            var account = result[0];
            if (!account) {
                reject('No account!');
            }
            storageContract.methods.upgradeVersion(crypto_contract_address, account)
                .send({
                    from: account,
                    gasLimit: 1160000,
                    gasPrice: 0
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    resolve(confirmationNumber, receipt)
                })
                .on('receipt', function (receipt) {
                    resolve(receipt);
                })
                .on('error', function (error) {
                    reject(error)
                });
        });
    });
};