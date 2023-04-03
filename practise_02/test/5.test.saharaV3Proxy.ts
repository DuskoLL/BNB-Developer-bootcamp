import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("sahara (proxy) V3 with name", function () {
  let sahara:Contract
  let saharaV2:Contract
  let saharaV3:Contract

  beforeEach(async function () {
    const Sahara = await ethers.getContractFactory("Sahara");
    const SaharaV2 = await ethers.getContractFactory("SaharaV2");
    const SaharaV3 =  await ethers.getContractFactory("SaharaV3");

    //initialize with 42
    sahara = await upgrades.deployProxy(Sahara, [42], {initializer: 'setValue'});
    saharaV2 = await upgrades.upgradeProxy(sahara.address, SaharaV2);
    saharaV3 = await upgrades.upgradeProxy(sahara.address, SaharaV3);
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    //查看v2里的value是不是 v1里的初始值
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('42'));
    //在v3执行+1 
    await saharaV3.increment();
    //查看v2 里边是不是43
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('43'));

    //在v2里设置value为100
    await saharaV2.setValue(100);
    //查看v2 里的值是不是100
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('100'));
  })

  it("should set name correctly in V3", async function () {
    expect(await saharaV3.name()).to.equal("");

    const boxname="my Sahara V3";
    await saharaV3.setName(boxname);
    expect(await saharaV3.name()).to.equal(boxname);
  })

})