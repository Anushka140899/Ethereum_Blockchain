// SPDX-License-Identifier: MIT

pragma solidity^0.5.16;

import "./AsToken.sol";

contract EthSwap{
   
   string public name="EthSwap Instant Exchange";
   AsToken public token;

   //Redemption rate = # of tokens received for1 ether
   uint public rate = 100; 
   event TokensPurcahsed(address account, address token, uint amount, uint rate);
   event TokensSold(address account, address token, uint amount, uint rate);

   constructor(AsToken _token) public{

      token = _token;
   }

   function buyTokens() public payable{

      uint tokenAmount = msg.value * rate;
      
      //Require ethswaphas enough tokens
      require(token.balanceOf(address(this))>=tokenAmount);

      token.transfer(msg.sender, tokenAmount);

      emit TokensPurcahsed(msg.sender, address(token), tokenAmount, rate);    //Constructs a log i.e history
   }

   function sellTokens(uint _amount) public {

      //User can's sell more tokens than he already has
      require(token.balanceOf(msg.sender)>=_amount);

      uint etherAmount = _amount/rate;

      require(address(this).balance>=etherAmount);

      token.transferFrom(msg.sender,address(this), _amount);         //Approval should be calledss
      msg.sender.transfer(etherAmount);      //Transfers the ether to the person calling the funtion
      emit TokensSold(msg.sender, address(token), _amount, rate);

   }
}