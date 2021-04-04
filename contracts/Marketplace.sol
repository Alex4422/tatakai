// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';


contract Marketplace is ERC721Holder, Ownable {

    using SafeERC20 for IERC20;
    IERC20 public acceptedToken;

    constructor(address _acceptedToken) public {
        acceptedToken = IERC20(_acceptedToken);
    }
    
    
    function buy(address _nftAddress, address _buyer, uint256 _assetId, uint256 _priceInWei) public returns(uint256) {
        acceptedToken.transferFrom(
                msg.sender,
                owner(),
                _priceInWei
        );
        
        IERC721(_nftAddress).safeTransferFrom(
            address(this),
            _buyer,
            _assetId
        );
        
        
    }
     
}