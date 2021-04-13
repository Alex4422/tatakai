// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract CardItem is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    struct TokenInfo {
        address owner;
        string ipfsHash;
    }

    Counters.Counter public _tokenIds;
    address public marketplace;

    mapping (uint256 => TokenInfo) public tokenInfoMap;
    mapping(string => bool) public ipfsHashes;
        
    event ItemCreated(
        address owner,
        uint256 tokenId
    );

    constructor (string memory _name, string memory _symbol, address _marketplace) public ERC721(_name, _symbol) {
          marketplace = _marketplace;
    }

    /** 
     * @dev Mint a new NFT  
     * @param _tokenURI - URL include ipfs hash
     */
    function mintNFT(string memory _tokenURI) public onlyOwner returns (uint256) {
        require(ipfsHashes[_tokenURI] != true, "Already registered");  
        
         _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _safeMint(marketplace, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        
        ipfsHashes[_tokenURI] = true;
        tokenInfoMap[newItemId] = TokenInfo({
            owner: marketplace,
            ipfsHash: _tokenURI
        });
     
        emit ItemCreated(marketplace, newItemId);
     
        return newItemId;
    }
}
