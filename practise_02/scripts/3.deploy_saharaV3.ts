import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original sahara(proxy) address");
  const SaharaV3 = await ethers.getContractFactory("SaharaV3");
  console.log("upgrade to SaharaV3...");
  const saharaV3 = await upgrades.upgradeProxy(proxyAddress, SaharaV3);

  const implementation = await upgrades.erc1967.getImplementationAddress(saharaV3.address);

  const admin = await upgrades.erc1967.getAdminAddress(saharaV3.address);


  console.log(saharaV3.address," saharaV3 address(should be the same)")
  console.log(admin," AdminAddress");
  console.log(implementation," ImplementationAddress")

  addressList['proxyV3'] = saharaV3.address;
  addressList['adminV3'] = admin;
  addressList['implementationV3'] = implementation;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})


