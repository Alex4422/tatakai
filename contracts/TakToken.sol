// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title TakToken Contract
/// @dev This contract manages everything related to ERC20 token that the marketplace will use.
contract TakToken is ERC20 {
    
    /**
     * @dev Initializes the contract by setting a `name`, a `symbol` to the ERC20 token.
     * @param name - ERC20 name
     * @param symbol - ERC20 symbol
     */
   constructor(string memory name, string memory symbol) ERC20(name, symbol){
       _mint(msg.sender, 10**18);
   }
}