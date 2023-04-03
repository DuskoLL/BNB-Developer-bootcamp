
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

async function main() {

  const Sahara = await ethers.getContractFactory("Sahara")
  console.log("Deploying sahara...")
  
  //部署合约  执行3笔交易  部署 代理合约 逻辑合约  proxyadmin合约
  const sahara = await upgrades.deployProxy(Sahara,[42], { initializer: 'initialize' })

  await sahara.deployed();
  console.log(sahara.address," sahara(proxy) address")

  const admin = await upgrades.erc1967.getAdminAddress(sahara.address);

  console.log(admin," AdminAddress");

  const implementation = await upgrades.erc1967.getImplementationAddress(sahara.address);

  console.log(implementation," ImplementationAddress")

  const addressList = readAddressList();

  addressList['proxy'] = sahara.address;
  addressList['admin'] = admin;
  addressList['implementation'] = implementation;
  storeAddressList(addressList);

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})