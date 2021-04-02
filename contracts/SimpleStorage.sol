// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

contract SimpleStorage {
  uint storedData;
<<<<<<< HEAD

  function set(uint x) public {
    storedData = x;
=======
  //Declare an Event
  event Set(uint x);

  function set(uint x) public {
    storedData = x;
    //Emit an event
    emit Set(x);
>>>>>>> SimpleStorage contract
  }

  function get() public view returns (uint) {
    return storedData;
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> SimpleStorage contract
