
pragma solidity^0.5.16;

contract AsToken 
{
   string public name; 
   mapping(address => uint256) public balanceOf;
   uint256 public totalSupply;
    constructor(uint256 _initialSupply) public
    {
         name="ASToken";
         balanceOf[msg.sender]=_initialSupply;
         totalSupply=_initialSupply;
    }

}