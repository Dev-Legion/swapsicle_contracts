const { deployments, ethers } = require("hardhat");

//npx hardhat run scripts\2_deploy.js --network avalanche

//**** DEPLOY FACTORY AND UPDATE INIT CODE HASH ****// 
//**** IN /sicle/libraries/SicleLibrary.sol LN26. ****//
//**** HASH IS RETRIEVED FROM DEPLOYED FACTORY IN ****//
//**** VALUE pairCodeHash ON SNOWTRACE ****/

//**** SET sicleFactoryAddress BEFORE RUNNING ****/

async function main() {
  //const weth = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"; //WAVAX
  //const weth = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"; //WMATIC
  //const weth = "0x4200000000000000000000000000000000000006"; //WETH on Optimism
  //const weth = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"; //WETH on Arbitrum
  const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //WETH on Ethereum
  const INITIAL_MINT = ethers.utils.parseEther("79501600");
  const tokenName = "PToken"; //POPSToken
  const tokenSymbol = "PT"; //POPS
  //const feeTo = "0x58334Ad2C84619bC1F9C61372FcA6D5EB787De64";
  const feeTo = "0xA49Ba0C8bDabE48f34f96C891e2b31BdA1D0Bf4a";
  // SET FACTORY ADDRESS
  const sicleFactoryAddress = "0xEe673452BD981966d4799c865a96e0b92A8d0E45";
  // SET POPSToken ADDRESS
  //const popsTokenAddress = "0x240248628B7B6850352764C5dFa50D1592A033A8";

  //verification
  const verify = true;
  const sicleRouterAddress = "0x63530632e8fE40aCf8f1f4324f7645256263b64f";
  const popsBarAddress = "";
  const iceCreamVanAddress = "";

  const [deployer] = await ethers.getSigners();
  console.log("deploy by acct: " + deployer.address);

  const bal = await deployer.getBalance();
  console.log("bal: " + bal);

  const SicleFactory = await ethers.getContractFactory("SicleFactory");
  const sicleFactory = await SicleFactory.attach(sicleFactoryAddress);
  console.log("SicleFactory:", sicleFactory.address);

  const SicleRouter = await ethers.getContractFactory("SicleRouter02");
  const sicleRouter = verify
    ? await SicleRouter.attach(sicleRouterAddress)
    : await SicleRouter.deploy(sicleFactory.address, weth);
  await sicleRouter.deployed();
  console.log("SicleRouter:", sicleRouter.address);

/*   //POPSToken
  const POPSToken = await ethers.getContractFactory("POPSToken");
  const popsToken = await POPSToken.attach(popsTokenAddress);
  console.log("POPSToken:", popsToken.address);

  //POPSBar
  const POPSBar = await ethers.getContractFactory("POPSBar");
  const popsBar = verify
    ? await POPSBar.attach(popsBarAddress)
    : await POPSBar.deploy(popsToken.address);
  await popsBar.deployed();
  console.log("POPSBar:", popsBar.address);

  //IceCreamVan
  const IceCreamVan = await ethers.getContractFactory("IceCreamVan");
  const iceCreamVan = verify
    ? await IceCreamVan.attach(iceCreamVanAddress)
    : await IceCreamVan.deploy(
      sicleFactory.address,
      popsBar.address,
      popsToken.address,
      weth
    );
  await iceCreamVan.deployed();
  console.log("IceCreamVan:", iceCreamVan.address); */

  //if (!verify) {
    await sicleFactory.setFeeTo(feeTo);
    console.log("Set feeTo:", feeTo);
  //}
/*   if (!verify) {
    await sicleFactory.setFeeToStake(iceCreamVan.address);
    console.log("Set feeToStake:", iceCreamVan.address);
  } */

  if (!verify) return;

   console.log("verifying SicleRouter02");
  await run("verify:verify", {
    address: sicleRouter.address,
    contract: "contracts/sicle/SicleRouter02.sol:SicleRouter02",
    constructorArguments: [sicleFactory.address, weth]
  });
/*
  console.log("verifying POPSBar");
  await run("verify:verify", {
    address: popsBar.address,
    contract: "contracts/POPSBar.sol:POPSBar",
    constructorArguments: [popsToken.address]
  });   */

/*   console.log("verifying IceCreamVan");
  await run("verify:verify", {
    address: iceCreamVan.address,
    contract: "contracts/IceCreamVan.sol:IceCreamVan",
    constructorArguments: [
      sicleFactory.address,
      popsBar.address,
      popsToken.address,
      weth
    ]
  }); */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
