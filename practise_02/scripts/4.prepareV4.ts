import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";


//获取代理地址
const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original Sahara (proxy) address");

  const SaharaV4 = await ethers.getContractFactory("SaharaV4");

  //调用proxyAdmin 来升级v4
  console.log("Preparing upgrade to SaharaV4...");
  const saharaV4Address = await upgrades.prepareUpgrade(proxyAddress, SaharaV4);

  const admin = await upgrades.erc1967.getAdminAddress(proxyAddress);

  console.log(saharaV4Address, " V4 implementation contract address");

  addressList['proxyV4'] = proxyAddress;
  addressList['adminV4'] = admin;
  addressList['implementationV4'] = saharaV4Address;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})