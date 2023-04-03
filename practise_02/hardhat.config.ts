import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import '@openzeppelin/hardhat-upgrades';

import * as dotenv from "dotenv";
dotenv.config();

import "./tasks";


const INFURA_PROJECT_ID = "YOUR INFURA PROJECT ID";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "YOUR ROPSTEN PRIVATE KEY";


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    bnbtest: {
      url: `https://bsc-testnet.nodereal.io/v1/${INFURA_PROJECT_ID}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};

// const config: HardhatUserConfig = {
//   solidity: "0.8.18",
//   // Default network when you don't specify "--network {network_name}"
//   defaultNetwork: "hardhat",
//   networks: {
//     hardhat: {},
//     localhost: {
//       url: "http://localhost:8545",
//     },
//     goerli: {
//       url: "https://goerli.infura.io/v3/" + process.env.INFURA_KEY,
//       accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
//       // {
//       //  mnemonic: process.env.MNEMONIC,
//       //  count: 20,
//       //}
//     },
//     bnbtest: {
//       url: process.env.BNBTest_URL || "",
//       accounts: process.env.BNBTest_PRIVATE_KEY !== undefined ? [process.env.BNBTest_PRIVATE_KEY] : [],
//     },
//   }
// };

// export default config;
