//SPDX-License-Identifier: None
// solium-disable linebreak-style
pragma solidity >=0.4.21;

import './Product.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
contract ProductLogic {
    using SafeMath for uint256;

    /**
    @notice takes the last four digits of _mixedDna
    @dev use safeMath to calculate some counts
    @param _mixedDna adn of a product
    @return return the last four digits of the dna
    */
    function getLastDigits(uint256 _mixedDna) internal pure returns(uint256){
        uint256 suma = 0;
        for (uint256 i = 0; i < 4; i++){
            uint256 lastDigit = _mixedDna.mod(10);
            _mixedDna = _mixedDna.div(10);
            suma = suma.add(lastDigit.mul(10**i));
        }
        return suma;
    }

    /**
    @notice mix the dna of a product with the address of a user
    @dev use safeMath to calculate some counts
    @param _product product which is going to be used to mix its dna
    @param _user User who is going to be used to mix his address
    */
    function mixDna(Product _product, address _user) public {
        uint256 convertAddress = uint256(_user);
        uint256 dna = _product.getDnaProduct();
        uint256 mixed = dna.add(convertAddress);
        _product.setDnaProduct(getLastDigits(mixed));
    }
  
}