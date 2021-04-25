// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract CardItem is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter public _tokenIds;
    address public marketplace;
    
    mapping(string => bool) public ipfsHashes;
    mapping(uint => TokenInfo) public tokens;
    
    event ItemCreated(
        address owner,
        uint256 tokenId
    );
    
    event NewPrice(
        uint256 assetId,
        uint256 price
    );

    struct TokenInfo {
        string tokenURI;
        uint256 price;
    }

    constructor (string memory _name, string memory _symbol, address _marketplace) public ERC721(_name, _symbol) {
          marketplace = _marketplace;
    }

    /** 
     * @dev Mint a new NFT  
     * @param _tokenURI - URL include ipfs hash
     * @return uint256 - return nft id
     */
    function mintNFT(string memory _tokenURI) public onlyOwner returns (uint256) {
        require(ipfsHashes[_tokenURI] != true, "Already registered");  
        
         _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _safeMint(marketplace, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        
        ipfsHashes[_tokenURI] = true;
        tokens[newItemId] = TokenInfo(
            _tokenURI,
            0
        );
     
        emit ItemCreated(marketplace, newItemId);
        return newItemId;
    }

    /** 
     * @dev Set a NFT price 
     * @param _assetId - NFT id
     * @param _amount - NFT price
     */
    function setPrice(uint256 _assetId, uint256 _amount) public {
        require(msg.sender == ownerOf(_assetId), "Caller is not nft owner");
        TokenInfo storage token = tokens[_assetId];
        token.price = _amount;

        emit NewPrice(_assetId, _amount);
    }
}
