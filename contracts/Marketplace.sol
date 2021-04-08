// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';


contract Marketplace is ERC721Holder, Ownable {

    IERC20 private acceptedToken;

    constructor(address _acceptedToken) public payable {
        acceptedToken = IERC20(_acceptedToken);
    }
    
    /** 
     * @dev Buy a NFT  
     * @param _nftAddress - NFT contract address
     * @param _buyer - Buyer address
     * @param _assetId - NFT id
     * @param _priceInWei - NFT price
     */
    function buy(address _nftAddress, address _buyer, uint256 _assetId, uint256 _priceInWei) public payable returns(uint256) {
        
        acceptedToken.transferFrom(
            msg.sender,
            owner(),
            _priceInWei
        );
        
        IERC721(_nftAddress).transferFrom(
            address(this),
            _buyer,
            _assetId
        );
        
    }
    
}