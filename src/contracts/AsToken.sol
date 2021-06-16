
pragma solidity^0.5.16;

contract AsToken 
{
   string public name; 
   string public symbol="AS";
   string public standard="ASToken version v1.0";
   mapping(address => uint256) public balanceOf;
   uint256 public totalSupply;
    constructor(uint256 _initialSupply) public
    {
         name="ASToken";
         balanceOf[msg.sender]=_initialSupply;
         totalSupply=_initialSupply;
    }

}