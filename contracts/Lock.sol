// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract Lock{
    string public mesg;
    function getMessage() public view returns(string memory){
        return mesg;
    }
    function setMessage(string memory _mesg) public {
        mesg=_mesg;
    } 
}