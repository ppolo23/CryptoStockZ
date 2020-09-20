//SPDX-License-Identifier: None
pragma solidity >=0.4.25 <0.7.0;

import './Product.sol';

/**
@title Storage of all the bussines
@notice This contract contains all the lotteries created in the system
@dev This contract makes easy to update the logic by dividing the logic and the storage
*/
contract StockZStorage {

    address owner;
    address latestVersion;

    // mapping que pasa del id del producto a la posicion donde esta guardados(tokenId)
    mapping(address => uint256) internal mapPosition;
    Product[] products;
    
    // Given a product address maps the owner of that product
    // mapping(Product => User)productOwnedByUser;

    /**
    @notice checks if the contract calling is the latest version provided
    */
    modifier onlyLatestVersion() {
       require(msg.sender == latestVersion, 'only latest version');
        _;
    }
    
    constructor(address _sender) public {
        owner = _sender;
        latestVersion = msg.sender;
    }

    function upgradeVersion(address _newVersion, address _sender) public {
        require(_sender == owner, 'only owner');
        latestVersion = _newVersion;
    }
    
    /**
    @notice gets a Product by its address
    @param _key address of the Product
    @return the Product
    function getProduct(address _key) external view returns(Product){
        return productStorage[_key];
    }
    */

    /**
    @notice gets all the Products saved
    @return the Products
    */
    function getProducts() external view returns (Product[] memory){
        return products;
    }

    // *** Setter Methods ***
    /**
     @notice adds a new Product to the storage mapping and array
     @dev can only be executed by the latest version contract
     @param _value Product to save
    */
    function setProduct(Product _value) external onlyLatestVersion {
        products.push(_value);
    }
    
    /**
     @notice Get the position of the product searched and returns the token.
     @param _idProduct Product's address
    */
    function getProductToken(address _idProduct) external view returns(uint256){
        return mapPosition[_idProduct];
    }
    
    /**
     @notice Set the position of the product in the mapping.
     @param _idProduct Product's id
     @param _tokenId Position at the array
     */
    function setPositionProduct(address _idProduct, uint256 _tokenId) external {
        mapPosition[_idProduct] = _tokenId;
    }
}