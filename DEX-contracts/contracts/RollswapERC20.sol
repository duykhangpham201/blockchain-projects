// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RollswapERC20 is Ownable, ERC20 {
    address public token0;
    address public token1;

    constructor(
        string memory name, 
        string memory symbol,
        address _token0,
        address _token1
        ) Ownable() ERC20(name, symbol) {
            token0=_token0;
            token1=_token1;
        }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }
}