// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract CardItem is ERC721URIStorage, Ownable, Pausable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    
    Counters.Counter public _tokenIds;
    address public marketplace;
    
    mapping(string => bool) public ipfsHashes;
    mapping(uint256 => TokenInfo) public tokens;
    
    event ItemCreated(
        address owner,
        uint256 tokenId
    ); 

    struct TokenInfo {
        string tokenURI;
        uint256 price;
        bool isForSale;
    }

    constructor (string memory _name, string memory _symbol, address _marketplace) ERC721(_name, _symbol) {
        require(_marketplace != address(0));
        marketplace = _marketplace;
    }

    modifier onlyMarketplace() {
        require(msg.sender == marketplace, "Caller is not marketplace");
        _;
    }

    /** 
     * @dev Mint a new NFT  
     * @param _tokenURI - URL include ipfs hash
     * @return assetId - return nft id
     */
    function mintNFT(string memory _tokenURI) public whenNotPaused onlyOwner returns (uint256 assetId) {
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
        require(_amount >= 0, "Price must be higher or equal 0");
        TokenInfo storage token = tokens[_assetId];
        token.price = _amount;
    }

    /** 
     * @dev Get a NFT price
     * @return price - return nft price 
     */
    function getPrice(uint256 _assetId) public view returns(uint256 price) {
        return tokens[_assetId].price; 
    }

    /** 
     * @dev put NFT on sale
     * @param _assetId - NFT id
     */
    function putOnSale(uint256 _assetId) external whenNotPaused onlyMarketplace {
        require(getOnSale(_assetId) == false, "Already on sale!");
        TokenInfo storage token = tokens[_assetId];
        token.isForSale = true;
    }

    /** 
     * @dev remove NFT on sale
     * @param _assetId - NFT id
     */
    function removeOnSale(uint256 _assetId) external whenNotPaused onlyMarketplace {
        require(getOnSale(_assetId) == true, "Already out of sale!");
        TokenInfo storage token = tokens[_assetId];
        token.isForSale = false;
    }

    /** 
     * @dev Get a status NFT on sale 
     * @return isForSale - return true if nft is for sale or false if not 
     */
    function getOnSale(uint256 _assetId) public view returns(bool isForSale) {
        return tokens[_assetId].isForSale; 
    }
}
