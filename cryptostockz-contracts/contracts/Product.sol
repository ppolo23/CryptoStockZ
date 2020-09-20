//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;


/**
@title Interface of the logic behind the Users
@notice This contract only defines the functions needed and implemented in UserLogic
*/
interface LogicInterface {
    function mixDna(Product _product, address _user) external;
}

/**
@title Product
@notice This contract contains the smart contract associated to the product
*/
contract Product {
    string base_id;
    string unique_id;
    uint number_transactions;
    uint dnaProduct;
    uint8 level;

    LogicInterface productLogicContract;
    /**
    @notice sets the address of the logic
    @param _address address of the interface
    */
    function setLogicInterfaceAddress(address _address) external  {
        productLogicContract = LogicInterface(_address);
    }

    /**
    @notice gets the address where the logic contract is set
    @return logicContract
    */
    function getLogicContract() public view returns (LogicInterface) {
        return productLogicContract;
    }

    constructor(string memory _baseId, string memory _uniqueId, address _productLogic) public{
        base_id = _baseId;
        unique_id = _uniqueId;
        number_transactions = 0;
        level = 0;
        dnaProduct = 0;
        productLogicContract = LogicInterface(_productLogic);
    }
    //GETTERS y SETTEERS

    //getters
    /**
    @notice gets the base id of the product
    @return base id of the product
    */
    function getBaseId() public view returns(string memory){
        return base_id;
    }
    /**
    @notice gets the unique id of the product
    @return unique id of the product
    */
    function getUniqueId() public view returns(string memory){
        return unique_id;
    }
    /**
    @notice gets the number of transactions that a product has participated
    @return number of transactions of the product
    */
    function getTransactions() public view returns(uint){
        return number_transactions;
    }
    /**
    @notice gets the addres of a contract product
    @return addres of the contract
    */
    function getAddress() public view returns(address){
        return address(this);
    }
    /**
    @notice gets the level of the product
    @return level of the product
    */
    function getLevel() public view returns(uint8){
        return level;
    }
    /**
    @notice gets the dna of the product
    @return dna of the product
    */
    function getDnaProduct() public view returns(uint256){
        return dnaProduct;
    }

    //setters
    /**
    @notice add 1 to the number of transactions
    */
    function setTransactions() internal{
        number_transactions++;
    }
    /**
    @notice sets the dna of the product
    @param _dnaProduct uint representing the dna of the product
    */
    function setDnaProduct(uint _dnaProduct) external{
        dnaProduct = _dnaProduct;
    }

    /**
    @notice sets the level of the product
    @param _level uint representing the level of the product
    */
    function setLevel(uint8 _level) public {
        level = _level;
    }

    // Logic functions
    /**
    @notice mix the dna of the product with the addres of _user
    @param _user user to mix with the dna
    */
    function mixDna(address _user) public {
        productLogicContract.mixDna(this,_user);
    }


   //####### Programado para que  cada vez que es añadido a la wishlist suba de nivel
   //####### La idea es marcar unos rangos de "me gusta" que hagan las subidas
   //####### Ej: cada 10, 50, 100 etc
    function increaseLevel() public {
        if(level < 9){
            level++;
        }
    }

    function decreaseLevel() public {
        if(level > 0){
            level--;
        }
    }

}