//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;
import "./ProductLogic.sol";
import "./ProductToken.sol";

import "./StockZStorage.sol";
import "./Ownable.sol";
import "./Product.sol";


contract CryptoStockZ is Ownable {
    
    StockZStorage stockZStorage;
    ProductToken productToken = new ProductToken();
    address productLogic = address(new ProductLogic());

    event createProductEvent(address _owner, address _productAddress, string _baseId, string _uniqueId, uint256 _numberTransactions, uint256 _dna, uint8 _level);
    event transferTokenEvent(address _from, address _to, address _idProduct, uint256 _newDna);

    // StockZStorage Storage
    /**
    @notice sets the address of the Storage contract
    @dev Storage has all products saved in order to have an eternal storage
    @param _StockZStorageAddr address of the Storage contract
    */
    function setStockZStorage(address _StockZStorageAddr) public onlyOwner {
        stockZStorage = StockZStorage(address(_StockZStorageAddr));
    }

     // ProductToken Storage
    /**
    @notice sets the address of the Token contract
    @dev Storage has all products association with their owners
    @param _productTokenAddr address of the Storage contract
    */
    function setProductToken(address _productTokenAddr) public onlyOwner {
        productToken = ProductToken(address(_productTokenAddr));
    }

    /**
    @notice create a product and the token associated to this product.
    @dev emits an event in order to know that a new product has been created
    @param _baseId of a product
    @param _uniqueId of a product
    */
    // function createProduct(string memory _ean, string memory  _sku, string memory _name) public {
    function createProduct(string memory _baseId, string memory _uniqueId) public {
        Product product = new Product(_baseId, _uniqueId, productLogic);
        uint256 tokenId = stockZStorage.getProducts().length;
        stockZStorage.setProduct(product);
        stockZStorage.setPositionProduct(product.getAddress(), tokenId);
        productToken.mint(msg.sender, tokenId);
        emit createProductEvent(msg.sender, product.getAddress(), product.getBaseId(), product.getUniqueId(), product.getTransactions(), product.getDnaProduct(), product.getLevel());
    }
    
    /**
    @notice transfer the token from msg.sender to _to
    @dev emits an event in order to know that a token has been transfered
    @param _to the addres who is going to recieve the token
    @param _idProduct address of a product
    */
    function transferProduct(address _to, address _idProduct) public {
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        productToken.transferToken(msg.sender, _to, tokenId);
        // stockZStorage.setProduct(stockZStorage.getProducts()[tokenId]);
        stockZStorage.getProducts()[tokenId].mixDna(_to);
        emit transferTokenEvent(msg.sender, _to, _idProduct, stockZStorage.getProducts()[tokenId].getDnaProduct());
    }


// ####################
    function updateProductLevel(address _idProduct, bool increase) public {
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        if(increase){
            stockZStorage.getProducts()[tokenId].increaseLevel();
        }else{
            stockZStorage.getProducts()[tokenId].decreaseLevel();
        }
    }
// ####################

    /**
    @notice gets all the producst kept in the storage
    @return all the products
    */
    function getProducts()public view returns(Product[] memory) {
        return stockZStorage.getProducts();
    }
    
    /**
    @notice gets all the attributes of a product 
    @param _idProduct address of the product to show
    @return all the attributes
    */
    function getProductFromAddress(address _idProduct) public view returns(string memory, string memory, uint, uint, uint8, address){
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        return(stockZStorage.getProducts()[tokenId].getBaseId(), 
               stockZStorage.getProducts()[tokenId].getUniqueId(),
               stockZStorage.getProducts()[tokenId].getTransactions(),
               stockZStorage.getProducts()[tokenId].getDnaProduct() , 
               stockZStorage.getProducts()[tokenId].getLevel(),
               productToken.getOwner(tokenId)
            );
    }
    
    /**
    @notice gets the owner of a product
    @dev we transform the product address into a tokenId
    @param _idProduct address of the product 
    @return the address of the product
    
    function getOwnerOfProduct(address _idProduct) public view returns(address){
        uint256 tokenId = stockZStorage.getProductToken(_idProduct);
        return productToken.getOwner(tokenId);
    }*/
    
    /**
    @notice gets the address of the storage 
    @return the address of the storage
    */
    function getStorageAddress() public view onlyOwner returns(address) {
        return address(stockZStorage);
    }
    
    /**
    @notice gets the address of the productToken
    @return the address of the productToken
    function getProductTokenAddress() public view onlyOwner returns(address) {
        return address(productToken);
    }
    */
    
    /**
    @notice gets the total number of tokens
    @return the total number of tokens
    
    function getTotalTokens() public view returns(uint256) {
        return productToken.totalTokens();
    }
    */
    
    /**
    @notice gets the name of our tokens
    @return the name of our tokens
    function getCredentials() public view returns(string memory, string memory){
        return(productToken.name(), productToken.symbol());
    }
    */
    
    /**
    @notice give the number of tokens from a given address
    @param _owner address which want to know about the number of tokens
    @return the number of tokens

    function getBalanceOwner(address _owner) public view returns(uint256) {
        return productToken.balanceOf(_owner);
    }*/

    /**
    @notice transfer the token associated to _product from _from to _to
    @dev this function is only for the owner of the service
    @param _from address who has the token
    @param _to address who is going to recieve the token
    @param _product address associated to the token
    */
    function transferByRequest(address _from, address _to, address _product)public onlyOwner{
        uint256 tokenId = stockZStorage.getProductToken(_product);
        productToken.transferToken(_from, _to, tokenId);
    }
}



