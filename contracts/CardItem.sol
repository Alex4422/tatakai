// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract CardItem is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    event ItemCreated(
        address owner,
        uint256 tokenId
    );
    
    struct TokenInfo {
        address owner;
        string ipfsHash;
    }
    
    uint256 public pricePerToken;

    mapping (uint256 => TokenInfo) public tokenInfoMap;
    mapping(string => bool) public ipfsHashes;
    mapping(string => uint256) public ipfsHashToTokenId;

    constructor (string memory _name, string memory _symbol, uint256 _pricePerToken) public ERC721(_name, _symbol) {
          pricePerToken = _pricePerToken;
    }

    /** 
     * @dev Mint a new NFT  
     * @param _owner - NFT owner
     * @param _tokenURI - URL include ipfs hash
     */
    function mint(address _owner, string memory _tokenURI) public onlyOwner returns (uint256) {
        require(ipfsHashes[_tokenURI] != true, "Already registered");  
        
         _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _safeMint(_owner, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        
        ipfsHashes[_tokenURI] = true;
        ipfsHashToTokenId[_tokenURI] = newItemId;
     
        tokenInfoMap[newItemId] = TokenInfo({
                owner: _owner,
                ipfsHash: _tokenURI
        });
     
        emit ItemCreated(_owner, newItemId);
     
        return newItemId;
    }
}
