//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract KeyRegistrar {
    mapping(address => string) private keys;

    function getKey() external view returns (string memory) {
        return keys[msg.sender];
    }

    function setKey(string memory key) external payable {
        console.log(msg.sender);
        keys[msg.sender] = key;
    }
}
