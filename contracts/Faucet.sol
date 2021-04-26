// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

/// @title Faucet Contract
/// @dev This contract manages everything related to Faucet
contract Faucet is Ownable, Pausable {
    using SafeMath for uint256;

    uint256 constant public tokenAmount = 10000;
    uint256 constant public waitTime = 30 minutes;
    IERC20 public tokenInstance;
    
    mapping(address => uint256) lastAccessTime;
    
    /**
     * @dev Emitted when owner request tokens.
     */
    event Withdrawal(
        address to
    );
    
    /** 
     * @dev Initializes the contract by setting a ERC20 token instance.
     * @param _tokenInstance - ERC20 token instance.
     */
    constructor(address _tokenInstance) {
        require(_tokenInstance != address(0));
        tokenInstance = IERC20(_tokenInstance);
    }

    /** 
     * @dev Request faucet token
     */
    function requestTokens() public whenNotPaused onlyOwner {
        require(allowedToWithdraw(msg.sender), "You have to wait 30 minutes!");
        tokenInstance.transfer(msg.sender, tokenAmount);
        lastAccessTime[msg.sender] = block.timestamp + waitTime;
        emit Withdrawal(msg.sender);
    }

    /** 
     * @dev Check if account allowed to withdraw
     * @param _address - requestor address 
     * @return bool - true if allowed, false if not allowed
     */
    function allowedToWithdraw(address _address) internal view returns (bool) {
        if(lastAccessTime[_address] == 0) {
            return true;
        } else if(block.timestamp >= lastAccessTime[_address]) {
            return true;
        }
        return false;
    }
}