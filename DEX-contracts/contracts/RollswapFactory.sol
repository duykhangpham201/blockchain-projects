//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "./RollswapPair.sol";

contract RollswapFactory {
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    RollswapPair public pair;

    event PairCreated(address token0, address token1, address pair, uint);

    function createPair(address token0, address token1) external returns (RollswapPair) {
        require(token0 != token1 && token0 != address(0) && token1 != address(0));
        require(getPair[token0][token1] == address(0));

        pair = new RollswapPair(IERC20Metadata(token0), IERC20Metadata(token1));
        getPair[token0][token1] = address(pair);
        getPair[token1][token0] = address(pair);
        allPairs.push(address(pair));
        

        emit PairCreated(token0, token1, address(pair), allPairs.length);

        return pair;
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }



}