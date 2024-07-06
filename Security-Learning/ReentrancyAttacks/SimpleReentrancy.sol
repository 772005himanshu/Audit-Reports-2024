// SPDX-License-Identifier: GPL- 3.0

pragma solidity ^0.8.17;


contract Vault{
    error NativeTokenTransferError();

    mapping(address => uint256) balances;
    function deposite() payable external{
        balances[msg.sender] = msg.value;

    }

    // you can fix these things by using on CEI effect
    function withdraw() external{ 
        delete balances[msg.sender];

        (bool sent, ) = payable(msg.sender).call{value: balances[msg.sender]}("");
        if(!sent) revert NativeTokenTransferError();

        // delete balances[msg.sender];
    }


}
