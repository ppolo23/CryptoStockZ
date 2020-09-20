pragma solidity ^0.6.3;
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
contract ProductToken is ERC721{
//      // Diferencia entre transfer y approved
//     /**
//     Transfer transfiere directamente el token de from a to
//     function transferFrom(address from, address to, uint256 tokenId)

//     envía la misma información que el caso anterior. Después, el contrato almacena quién está 
//     autorizado para tomar un token, generalmente en un mapping (uint256 => address). Entonces, cuando alguien
//     llame a takeOwnership, el contrato comprueba si ese msg.sender está autorizado por el propietario para
//     tomar ese token y si es así, le transfiere el token.
//     function approve(address to, uint256 tokenId)

//     La función mint es por la que se crea un token (https://www.youtube.com/watch?v=7TiXsOLiIrc)
//     _safeMint(address to, uint256 tokenId)
//     */
//     //StockZStorage stockZStorage = new StockZStorage(msg.sender);
    constructor() ERC721("Stock Z Products", "SZP") public{}


    
    /**
    @notice initialize the token associated to a Product
    @param _to address of the User who is going to recieve the token
    @param _tokenId token
    */
    function mint(address _to, uint256 _tokenId) public {
        _mint(_to, _tokenId);
    }
    

    /**
    @notice gets the owner of a token
    @param _tokenId token
    @return return the product´s owner
    */
    function getOwner(uint256 _tokenId) public view returns(address){
        return super.ownerOf(_tokenId);
    }
    

    /**
    @notice Transfer token (_tokenId) from msg.sender to another address.
    @param _tokenId token
    @param _from addres who has the token
    @param _to addres who is going to recieve the token
    */
    function transferToken(address _from, address _to, uint256 _tokenId) public{
        _transfer(_from, _to, _tokenId);
    }
    

    /**
    @notice gets the total number of created tokens
    @return return the number of tokens
    */
    function totalTokens() public view returns (uint256) {
        return super.totalSupply();
    }
}
