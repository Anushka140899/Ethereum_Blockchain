
pragma solidity^0.5.16;

contract AsToken 
{
   string public name; 
   string public symbol="AS";
   string public standard="ASToken version v1.0";

   mapping(address => uint256) public balanceOf;
   uint256 public totalSupply=1000000000000000000000000; //1 million ether
   uint8 public decimals=18;  //wei

   mapping(address => mapping(address => uint256)) public allowance;

   event Transfer(address indexed _from, address indexed _to, uint256 _value);     //Transfer event to be triggered

   event Approval(address indexed _owner, address indexed _spender, uint256 _value);   //Approvl event

    constructor() public
    {
         name="ASToken";
         balanceOf[msg.sender]=totalSupply;
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
         allowance[msg.sender][_spender] = _value;
         emit Approval(msg.sender, _spender, _value);
         return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
    {
         require(_value<=balanceOf[_from]);
         require(_value<=allowance[_from][msg.sender]);

         balanceOf[_from]-=_value;
         balanceOf[_to]+=_value;

         allowance[_from][msg.sender]-=_value;

         emit Transfer(_from, _to, _value);
         return true;     
    }
}