const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const ValentineDay = await hre.ethers.getContractFactory("ValentineDay");
  const valentineday = await ValentineDay.deploy(
    "Pop Corn Collection",
    "PCC",
    "ipfs://QmP4Eh7Jbwnn4ktgqtUP1BESiLRpy2FWozkUNdrYFq8m6n/"
  );

  await valentineday.deployed();

  console.log("valentineday deployed to:", valentineday.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
