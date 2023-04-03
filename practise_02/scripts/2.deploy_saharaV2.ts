
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original sahara(proxy) address");
  const SaharaV2 = await ethers.getContractFactory("SaharaV2");
  console.log("upgrade to SaharaV2...");
  const saharaV2 = await upgrades.upgradeProxy(proxyAddress, SaharaV2);

  const implementation = await upgrades.erc1967.getImplementationAddress(saharaV2.address);

  const admin = await upgrades.erc1967.getAdminAddress(saharaV2.address);

  console.log(saharaV2.address," saharaV2 address(should be the same)")
  console.log(admin," AdminAddress");
  console.log(implementation," ImplementationAddress")

  addressList['proxyV2'] = saharaV2.address;
  addressList['adminV2'] = admin;
  addressList['implementationV2'] = implementation;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})


