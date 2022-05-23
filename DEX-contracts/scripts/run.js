const main = async() => {
    const [owner] = await ethers.getSigners();

    const RollswapFactoryContractFactory = await ethers.getContractFactory('RollswapFactory');
    const RollswapFactory = await RollswapFactoryContractFactory.deploy();
    await RollswapFactory.deployed();
    console.log('Rollswap Factory Deployed to:', RollswapFactory.address);

    const Token = await ethers.getContractFactory('TestingToken');
    const Ohm = await Token.deploy("Olympus", "OHM", (10**18).toString());
    await Ohm.deployed();
    console.log("Ohm Token deployed at:", Ohm.address);

    const Time = await Token.deploy("Time", "TIME", (10**18).toString());
    await Time.deployed();
    console.log("Time Token deployed at:", Time.address);

    const NewPair = await RollswapFactory.createPair(Ohm.address, Time.address);
    await NewPair.wait();
    console.log("Pair address now is", NewPair.from);

    const checkLength = await RollswapFactory.allPairsLength();
    console.log("Pairs length now is", checkLength);
    
    const balance = await Ohm.getBalance({from: owner.address});
    console.log("amount of Ohm in wallet: ", balance);

    const testReserve = await NewPair.getReserve();
    console.log(testReserve);
}

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();