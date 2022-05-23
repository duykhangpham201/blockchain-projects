const main = async () => {
  const Token = await ethers.getContractFactory("TestingToken");
  const Ohm = await Token.deploy("Olympus", "OHM", (10 ** 19).toString());
  await Ohm.deployed();
  console.log("Ohm Token deployed at:", Ohm.address);

  const Time = await Token.deploy("Time", "TIME", (10 ** 19).toString());
  await Time.deployed();
  console.log("Time Token deployed at:", Time.address);

  const RollswapPairFactory = await ethers.getContractFactory("RollswapPair");
  const RollswapPair = await RollswapPairFactory.deploy(
    Ohm.address,
    Time.address
  );
  await RollswapPair.deployed();
  console.log("Rollswap Pair Deployed to:", RollswapPair.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
