// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';


contract Marketplace is ERC721Holder, Ownable {

    IERC20 private acceptedToken;
    
    event BuyTransaction(
        uint assetId,
        address oldOwner,
        address newOwner,
        uint price
    );

    constructor(address _acceptedToken) public payable {
        require(_acceptedToken != address(0));
        acceptedToken = IERC20(_acceptedToken);
    }

    receive() external payable {
        require(msg.value > 100, "You must send 100 wei minimum");
        require(msg.value < acceptedToken.balanceOf(address(this)), "Exceed balance");
        acceptedToken.transfer(msg.sender, msg.value);
    }
    
    /**
     * @dev Buy a NFT  
     * @param _nftAddress - NFT contract address
     * @param _assetId - NFT id
     * @param _priceInWei - NFT price
     */
    function buy(address _nftAddress, uint256 _assetId, uint256 _priceInWei) public payable returns(uint256) {
        address nftOwner = IERC721(_nftAddress).ownerOf(_assetId);
        
        acceptedToken.transferFrom(
            msg.sender, 
            nftOwner,
            _priceInWei
        );
        
        IERC721(_nftAddress).transferFrom(
            nftOwner,
            msg.sender,
            _assetId
        );

        emit BuyTransaction(_assetId, nftOwner, msg.sender, _priceInWei);
    }
    
}