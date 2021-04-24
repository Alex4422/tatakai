const path = require("path");
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const endpoints = {
  mainnet: `https://mainnet.infura.io/${INFURA_API_KEY}`,
  ropsten: `https://ropsten.infura.io/${INFURA_API_KEY}`,
  kovan: `https://kovan.infura.io/${INFURA_API_KEY}`,
  rinkby: `https://rinkby.infura.io/${INFURA_API_KEY}`,
};

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    //develop on Ganache check your config
    develop: {
      host: "127.0.0.1",
      port: 8545,
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
      confirmations: 0,
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
    matic: {
      provider: () =>
        // new HDWalletProvider(process.env.MNEMONIC,"https://rpc-mumbai.maticvigil.com/v1/c8de64ac9d1e2a12657516cfb14e8f1572c7d356"),
        new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC
          },
          providerOrUrl: "https://rpc-mumbai.maticvigil.com/v1/c8de64ac9d1e2a12657516cfb14e8f1572c7d356",
          numberOfAddresses: 1,
          shareNonce: true,
          derivationPath: "m/44'/1'/0'/0/"
        }),
      network_id: 80001,
      skipDryRun: true,
    }
  },
  compilers: {
    solc: {
      version: "0.8.3",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
