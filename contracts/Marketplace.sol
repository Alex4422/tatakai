// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import "./CardItem.sol";


contract Marketplace is ERC721Holder, Ownable, Pausable {
    using SafeMath for uint256;

    IERC20 private acceptedToken;
    CardItem private nft;
    
    event BuyTransaction(
        uint256 assetId,
        address oldOwner,
        address newOwner,
        uint256 price
    );

    event SetNewPrice(
        uint256 assetId,
        uint256 price
    );

    event PutOnSale(
        uint256 assetId
    );       
    
    event RemoveOnSale(
        uint256 assetId
    );

    constructor(address _acceptedToken) {
        require(_acceptedToken != address(0));
        acceptedToken = IERC20(_acceptedToken);
    }

    receive() external payable {
        require(msg.value > 100, "You must send 100 wei minimum");
        require(msg.value < acceptedToken.balanceOf(address(this)), "Exceed balance");
        acceptedToken.transfer(msg.sender, msg.value);
    }
    
    modifier onlyNFTOwner(address _nftAddress, uint256 _assetId) {
        require(_nftAddress != address(0));
        require(msg.sender == IERC721(_nftAddress).ownerOf(_assetId), "Caller is not nft owner");
        _;
    }

    /**
     * @dev Buy a NFT  
     * @param _nftAddress - NFT contract address
     * @param _assetId - NFT id
     */
    function buy(address _nftAddress, uint256 _assetId) public payable whenNotPaused {
        require(CardItem(_nftAddress).getOnSale(_assetId) == true, "Card is not for sale");
        address nftOwner = IERC721(_nftAddress).ownerOf(_assetId);
        uint256 priceInWei = CardItem(_nftAddress).getPrice(_assetId);

        acceptedToken.transferFrom(
            msg.sender, 
            nftOwner,
            priceInWei
        );
        
        IERC721(_nftAddress).transferFrom(
            nftOwner,
            msg.sender,
            _assetId
        );

        emit BuyTransaction(_assetId, nftOwner, msg.sender, priceInWei);
    }
    
    /** 
     * @dev Set a NFT price 
     * @param _assetId - NFT id
     * @param _amount - NFT price
     */
    function setPrice(address _nftAddress, uint256 _assetId, uint256 _amount) public whenNotPaused onlyNFTOwner(_nftAddress, _assetId) {
        CardItem(_nftAddress).setPrice(_assetId, _amount);
        emit SetNewPrice(_assetId, _amount);
    }

    /** 
     * @dev Put a NFT on sale 
     * @param _assetId - NFT id
     */
    function putOnSale(address _nftAddress, uint256 _assetId) public whenNotPaused onlyNFTOwner(_nftAddress, _assetId) {
        CardItem(_nftAddress).putOnSale(_assetId);
        emit PutOnSale(_assetId);
    }

        /** 
     * @dev remove NFT on sale
     * @param _assetId - NFT id
     */
    function removeOnSale(address _nftAddress, uint256 _assetId) public whenNotPaused onlyNFTOwner(_nftAddress, _assetId){
        CardItem(_nftAddress).removeOnSale(_assetId);
        emit RemoveOnSale(_assetId);
    }
}