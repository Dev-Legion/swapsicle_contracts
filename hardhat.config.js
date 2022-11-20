require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const {
  METAMASK_PRIVATE_KEY_ACCT1,
  RINKEBY_URL,
  ETH_URL,
  BSC_URL,
  POLY_URL,
  BSC_API_KEY,
  BSC_URL_TESTNET,
  MM_SS_DEPLOYER,
  AVALANCHE_API_KEY,
  MM_BG_SS_DEPLOYER,
  POLY_API_KEY,
  FANTOM_API_KEY,
  ARBITRUM_API_KEY,
  OPTIMISM_API_KEY,
  ETH_API_KEY
} = process.env;
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    eth: {
      url: ETH_URL,
      accounts: [MM_SS_DEPLOYER],
    },
    bsc: {
      url: BSC_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY_ACCT1}`],
    },
    poly: {
      url: POLY_URL,
      accounts: [MM_BG_SS_DEPLOYER]
    },
    bscTestnet: {
      url: BSC_URL_TESTNET,
      accounts: [`0x${METAMASK_PRIVATE_KEY_ACCT1}`],
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      accounts: [MM_SS_DEPLOYER],
    },     
    opera: {
      url: "https://rpc.ftm.tools/",
      accounts: [MM_SS_DEPLOYER],
    },
    arbitrumOne: {
      url: "https://arb1.arbitrum.io/rpc",
      accounts: [MM_SS_DEPLOYER],
    },
    optimisticEthereum: {
      url: "https://mainnet.optimism.io",
      accounts: [MM_SS_DEPLOYER],
    }        
  },
  etherscan: {
    apiKey: {
      //mainnet: ETH_API_KEY,
      //bsc: BSC_API_KEY,
      //polygon: POLY_API_KEY,
      //apiKey: ETH_API_KEY, //eth
      //rinkeby: ETH_API_KEY
      //bscTestnet: BSC_API_KEY,
      //avalanche: AVALANCHE_API_KEY
      opera: FANTOM_API_KEY,
      //arbitrumOne: ARBITRUM_API_KEY,
      //optimisticEthereum: OPTIMISM_API_KEY
    }
  }  
};
