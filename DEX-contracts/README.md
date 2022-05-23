# Rollswap Smart Contracts

An attempt at recreating a decentralized exchange such as Uniswap.

## Setting up local development

Requirements:
- [Node v14](https://nodejs.org/download/release/latest-v14.x/)  
- [Git](https://git-scm.com/downloads)


Local Setup Steps:
1. ``git clone https://github.com/duykhangpham201/rollswap-contracts.git ``
1. Install dependencies: `npm install` 
    - Installs [Hardhat](https://hardhat.org/getting-started/) and [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/) dependencies
1. Compile Solidity: ``npx hardhat run scripts/deploy.js``
