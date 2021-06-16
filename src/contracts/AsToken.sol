
pragma solidity^0.5.16;

contract AsToken 
{
   string public name; 
   string public symbol="AS";
   string public standard="ASToken version v1.0";
   mapping(address => uint256) public balanceOf;
   uint256 public totalSupply;

   event Transfer(address indexed _from, address indexed _to, uint256 _value);     //Transfer event to be triggered

   event Approval(address indexed _owner, address indexed _spender, uint256 _value);   //Approvl event

    constructor(uint256 _initialSupply) public
    {
         name="ASToken";
         balanceOf[msg.sender]=_initialSupply;
         totalSupply=_initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {

         require(balanceOf[msg.sender]>=_value);         //Checking if the sender's balance is enough

         balanceOf[msg.sender] -= _value;
         balanceOf[_to] += _value;

         emit Transfer(msg.sender, _to, _value);

         return true;
     }
    
    //Delegated Transfer

    function approve(address _spender, uint256 _value) public returns (bool success)
    {
         emit Approval(msg.sender, _spender, _value);
         return true;
    }
}