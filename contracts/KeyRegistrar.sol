//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract KeyRegistrar {
    mapping(address => string) private keys;

    function getKey() public view returns (string memory) {
        console.log(msg.sender);
        return keys[msg.sender];
    }

    function setKey(string memory key) external payable {
        console.log(msg.sender);
        keys[msg.sender] = key;
    }
}
