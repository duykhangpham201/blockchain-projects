# Rollswap Frontend

This is the front-end repo for Rollswap 
The Solidity Contract can be found [here](https://github.com/duykhangpham201/rollswap-contracts.git)

## Setting up Local Development

Required:

- [Node v14](https://nodejs.org/download/release/latest-v14.x/)
- [Git](https://git-scm.com/downloads)

```bash
$ git clone https://github.com/duykhangpham201/rollswap-frontend.git
$ cd roll-swap-frontend

# set up your environment variables 
$ touch .env

# fill in your own values in .env, then =>
$ npm install
$ npm start
```

The site is now running at `http://localhost:3000`!
Open the source code and start editing!


### Notes:

Main purpose of the frontend is to interact with the smart contracts. As a result, some of the features might need to be adjusted, you might sometimes need to refresh the page for the elements to load.