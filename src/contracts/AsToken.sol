
pragma solidity^0.5.16;

contract AsToken 
{
   mapping(address => uint256) public balanceOf;
   uint256 public totalSupply;
    constructor(uint256 _initialSupply) public
    {
         balanceOf[msg.sender]=_initialSupply;
         totalSupply=_initialSupply;
    }

}