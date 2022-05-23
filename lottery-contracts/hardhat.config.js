require('@nomiclabs/hardhat-waffle');
require('dotenv').config();


module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_API,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};