const path = require("path");
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const endpoints = {
  mainnet: `https://mainnet.infura.io/${INFURA_API_KEY}`,
  ropsten: `https://ropsten.infura.io/${INFURA_API_KEY}`,
  kovan: `https://kovan.infura.io/${INFURA_API_KEY}`,
  kovan: `https://rinkby.infura.io/${INFURA_API_KEY}`,
};

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    //develop on Ganache check your config
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, endpoints.mainnet),
      network_id: 1,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, endpoints.ropsten),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
    },

    rinkby: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, endpoints.rinkby),
      network_id: 4,
      gas: 1000000,
      confirmations: 0,
      timeoutBlocks: 200,
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, endpoints.kovan),
      network_id: 42,
      gas: 5500000,
      confirmations: 0,
      timeoutBlocks: 200,
    },
  },
  compilers: {
    solc: {
      version: "^0.7.4",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
