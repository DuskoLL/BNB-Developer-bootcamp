
import { ethers, upgrades } from "hardhat"
import { expect } from "chai"
import { Contract, BigNumber } from "ethers"

describe("SaharaV2 (proxy)", function () {
  let sahara: Contract
  let saharaV2: Contract

  beforeEach(async function () {
    const Sahara = await ethers.getContractFactory("Sahara"); 
    const SaharaV2 = await ethers.getContractFactory("SaharaV2"); 
    //initilize with 42
    sahara = await upgrades.deployProxy(Sahara, [42], { initializer: 'initialize' });
    //执行升级
    saharaV2 = await upgrades.upgradeProxy(sahara.address, SaharaV2);

    console.log(saharaV2.address," sahara/proxy after upgrade");

  })

  it("should retrieve value previously stored and increment correctly", async function () {
    //初始值是不是42
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('42'));

    //执行+1
    await saharaV2.increment();
    //result = 42 + 1 = 43
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('43'));

    //设置值为100
    await saharaV2.setValue(100);
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('100'));

    //执行-1
    await saharaV2.reduce();

    //值为99
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('99'));
  })

})