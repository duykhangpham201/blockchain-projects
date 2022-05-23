const main = async() => {
    const lotteryContractFactory = await hre.ethers.getContractFactory('Lottery');
    const lotteryContract = await lotteryContractFactory.deploy();

    await lotteryContract.deployed();
    console.log("Contract deployed to:", lotteryContract.address);
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