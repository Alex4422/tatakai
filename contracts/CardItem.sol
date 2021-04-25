// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

contract CardItem is ERC721URIStorage, Ownable, Pausable {
    using Counters for Counters.Counter;
    
    Counters.Counter public _tokenIds;
    address public marketplace;
    
    mapping(string => bool) public ipfsHashes;
    mapping(uint => TokenInfo) public tokens;
    
    event ItemCreated(
        address owner,
        uint256 tokenId
    ); 

    struct TokenInfo {
        string tokenURI;
        uint256 price;
        bool isForSale;
    }

    constructor (string memory _name, string memory _symbol, address _marketplace) public ERC721(_name, _symbol) {
          marketplace = _marketplace;
    }

    modifier onlyMarketplace() {
        require(msg.sender == marketplace, "Caller is not marketplace");
        _;
    }

    /** 
     * @dev Mint a new NFT  
     * @param _tokenURI - URL include ipfs hash
     * @return uint256 - return nft id
     */
    function mintNFT(string memory _tokenURI) public whenNotPaused onlyOwner returns (uint256) {
        require(ipfsHashes[_tokenURI] != true, "Already registered");  
        
         _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _safeMint(owner(), newItemId);
        _setTokenURI(newItemId, _tokenURI);
        
        ipfsHashes[_tokenURI] = true;
        tokens[newItemId] = TokenInfo(
            _tokenURI,
            0,
            false
        );
     
        emit ItemCreated(marketplace, newItemId);
        return newItemId;
    }

    /** 
     * @dev Set a NFT price 
     * @param _assetId - NFT id
     * @param _amount - NFT price
     */
    function setPrice(uint256 _assetId, uint256 _amount) external whenNotPaused onlyMarketplace {
        TokenInfo storage token = tokens[_assetId];
        token.price = _amount;
    }

    /** 
     * @dev Get a NFT price 
     */
    function getPrice(uint256 _assetId) public view returns(uint256) {
        return tokens[_assetId].price; 
    }

    /** 
     * @dev put NFT on sale
     * @param _assetId - NFT id
     */
    function putOnSale(uint256 _assetId) external whenNotPaused onlyMarketplace {
        TokenInfo storage token = tokens[_assetId];
        token.isForSale = true;
    }

    /** 
     * @dev remove NFT on sale
     * @param _assetId - NFT id
     */
    function removeOnSale(uint256 _assetId) external whenNotPaused onlyMarketplace {
        TokenInfo storage token = tokens[_assetId];
        token.isForSale = false;
    }

    /** 
     * @dev Get a status NFT on sale 
     */
    function getOnSale(uint256 _assetId) public view returns(bool) {
        return tokens[_assetId].isForSale; 
    }
}
