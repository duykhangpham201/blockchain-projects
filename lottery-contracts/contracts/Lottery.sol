//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable { 
    address[] players;

    function enterLottery() public payable {
        require(msg.value >= 0.01 ether);
        players.push(msg.sender);
    }

    function pseudoRandomize() private view returns (uint256) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public onlyOwner {
        uint winningIndex = pseudoRandomize() % players.length;
        payable(players[winningIndex]).transfer(address(this).balance);
        players = new address[](0);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}