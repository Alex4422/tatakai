// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

contract Faucet is Ownable, Pausable {
    uint256 constant public tokenAmount = 10000;
    uint256 constant public waitTime = 30 minutes;

    IERC20 public tokenInstance;
    address public marketplace;
    
    mapping(address => uint256) lastAccessTime;

    event Withdrawal(address indexed to);

    constructor(address _tokenInstance, address _marketplace) public {
        require(_tokenInstance != address(0));
        require(_marketplace != address(0));
        tokenInstance = IERC20(_tokenInstance);
        marketplace = _marketplace;
    }

    function requestTokens() public whenNotPaused onlyOwner {
        require(allowedToWithdraw(msg.sender), "You have to wait 30 minutes!");
        tokenInstance.transfer(msg.sender, tokenAmount);
        lastAccessTime[msg.sender] = block.timestamp + waitTime;
        emit Withdrawal(msg.sender);
    }

    function allowedToWithdraw(address _address) internal view returns (bool) {
        if(lastAccessTime[_address] == 0) {
            return true;
        } else if(block.timestamp >= lastAccessTime[_address]) {
            return true;
        }
        return false;
    }
}