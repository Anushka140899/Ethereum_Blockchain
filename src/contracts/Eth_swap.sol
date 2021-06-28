// SPDX-License-Identifier: MIT

pragma solidity^0.5.16;

import "./AsToken.sol";

contract EthSwap{
   
   string public name="EthSwap Instant Exchange";
   AsToken public token;

   constructor(AsToken _token) public{

      token = _token;
   }
}