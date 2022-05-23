require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".env").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "spark",
  networks: {
    spark: {
      chainId: 123,
      url: "https://rpc.fusespark.io",
      accounts: [privateKey],
      gasPrice: 1000000000,
    },
    fuse: {
      url: "https://rpc.fuse.io",
      chainId: 122,
      accounts: [privateKey],
      gasPrice: 1000000000,
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20,
      },
    },
  },
  paths: {
    artifacts: "./src/artifacts",
  },
};
