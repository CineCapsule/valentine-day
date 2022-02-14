const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const ValentineDay = await hre.ethers.getContractFactory("ValentineDay");
  const valentineday = await ValentineDay.deploy(
    "Pop Corn Collection",
    "PCC",
    "ipfs://QmRqnn7Kgiq4vZMHEm4wTgDmU6x8dtMZkjVSNhVDFpEGFt/"
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
