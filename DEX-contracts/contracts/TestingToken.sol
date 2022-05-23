//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestingToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        approve(msg.sender, balanceOf(msg.sender));
    }

    function mint() public returns (bool) {
        _mint(msg.sender, 1000);
        return true;
    }

    function getBalance() external view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function sendToken(address sender, uint256 supply) external {
        transfer(sender, supply);
    }
}