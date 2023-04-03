import { task } from "hardhat/config";
// import { ethers } from "hardhat";
import { readAddressList } from "../scripts/helper";

task("saharav1", "exchagne with sahara v1").setAction(async (_, hre) => {
  
  //和v1 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const sahara = await hre.ethers.getContractAt("Sahara", proxyAddress);

  //查看当前的value 值
  console.log("当前值: ", await sahara.retrieve());

  //设置一个新的value值
  console.log("设置值为95: ", await sahara.setValue(95));

  console.log("当前值: ", await sahara.retrieve());
});

task("saharav2", "exchagne with sahara v2").setAction(async (_, hre) => {
  
  //和v2 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const saharaV2 = await hre.ethers.getContractAt("SaharaV2", proxyAddress);

  //v2 中新增了2个函数  increment / reduce
  //查看当前的value 值
  console.log("当前值: ", await saharaV2.retrieve());

  //调用reduce 对value-1
  console.log("执行减1操作: ", await saharaV2.reduce());

  //调用reduce 对value-1
  console.log("执行减1操作: ", await saharaV2.reduce());

  //调用increment 对value+1
  console.log("执行减1操作: ", await saharaV2.increment());
});

task("saharav3", "exchagne with sahara v3").setAction(async (_, hre) => {
  
  //和v2 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const saharaV3 = await hre.ethers.getContractAt("SaharaV3", proxyAddress);

  //v2 中新增了1个name变量  setName() 可以修改name的值
  //查看当前的value 值
  console.log("当前值: ", await saharaV3.retrieve());

  //查看当前name 值
  console.log("当前name值: ", await saharaV3.name());

  //设置name 的值
  let boxname="my Sahara V3";
  await saharaV3.setName(boxname);
  
  console.log("当前name值: ", await saharaV3.name());
});