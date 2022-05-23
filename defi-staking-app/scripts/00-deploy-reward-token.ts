/* eslint-disable prettier/prettier */
import { getNamedAccounts, deployments } from "hardhat";

module.exports = async () => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const RewardToken = await deploy("RewardToken", {
    contract: "RewardToken",
    from: deployer,
    args: [],
    log: true,
  });
};

module.exports.tags = ["all", "rewardToken"];
