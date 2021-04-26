// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

/// @title NFT Contract
/// @dev This contract manages everything related to NFT
contract CardItem is ERC721URIStorage, Ownable, Pausable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    
    Counters.Counter public _tokenIds;
    address private marketplace;
    
    struct TokenInfo {
        string tokenURI;
        uint256 price;
        bool isForSale;
    }
    
    mapping(string => bool) public ipfsHashes;
    mapping(uint256 => TokenInfo) public tokens;
    
    /**
     * @dev Emitted when NFT is minted.
     */
    event ItemCreated(
        address owner,
        uint256 tokenId
    ); 
     
    /** 
     * @dev Throws if called by any account other than the marketplace.
     */
    modifier onlyMarketplace() {
        require(msg.sender == marketplace, "Caller is not marketplace");
        _;
    }
     
    /** 
     * @dev Initializes the contract by setting a `name`, a `symbol` and the `marketplace` address that will manage the token collection.
     * @param _name - token collection name
     * @param _symbol - token collection symbol
     * @param _marketplace - token collection address
     */
    constructor (string memory _name, string memory _symbol, address _marketplace) ERC721(_name, _symbol) {
        require(_marketplace != address(0));
        marketplace = _marketplace;
    }

    /** 
     * @dev Set a NFT price 
     * @param _assetId - NFT id
     * @param _amount - NFT price
     */
    function setPrice(uint256 _assetId, uint256 _amount) external whenNotPaused onlyMarketplace {
        require(_amount >= 0, "Price must be higher or equal 0");
        TokenInfo storage token = tokens[_assetId];
        token.price = _amount;
    }
    
    /** 
     * @dev Update status NFT on sale
     * @param _assetId - NFT id
     * @param _status - NFT status (isForSale)
     */
    function updateOnSale(uint256 _assetId, bool _status) external whenNotPaused onlyMarketplace {
        require(tokens[_assetId].isForSale == !_status, "Already set up!");
        TokenInfo storage token = tokens[_assetId];
        token.isForSale = _status;
    }

    /** 
     * @dev Mint a new NFT  
     * @param _tokenURI - URL include ipfs hash
     * @param _priceBase - return nft id
     * @return assetId - NFT id
     */
    function mintNFT(string memory _tokenURI, uint256 _priceBase) public whenNotPaused onlyOwner returns (uint256 assetId) {
        require(ipfsHashes[_tokenURI] != true, "Already registered");  
        
         _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _safeMint(owner(), newItemId);
        _setTokenURI(newItemId, _tokenURI);
        
        ipfsHashes[_tokenURI] = true;
        
        tokens[newItemId] = TokenInfo(
            _tokenURI,
            _priceBase,
            true
        );
     
        emit ItemCreated(marketplace, newItemId);
        
        return newItemId;
    }
    
    /** 
     * @dev Get a NFT price
     * @param _assetId - NFT id
     * @return price - return nft price 
     */
    function getPrice(uint256 _assetId) public view returns(uint256 price) {
        return tokens[_assetId].price; 
    }

    /** 
     * @dev Get a status NFT on sale 
     * @param _assetId - NFT id
     * @return isForSale - true if nft is for sale or false if nft is out of sale
     */
    function getOnSale(uint256 _assetId) public view returns(bool isForSale) {
        return tokens[_assetId].isForSale; 
    }

}
