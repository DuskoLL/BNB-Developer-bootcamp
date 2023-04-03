import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("sahara (proxy) V3 with name", function () {
  let sahara:Contract;
  let saharaV2:Contract;
  let saharaV3:Contract;
  let saharaV4:Contract;

  beforeEach(async function () {
    const Sahara = await ethers.getContractFactory("Sahara");
    const SaharaV2 = await ethers.getContractFactory("SaharaV2");
    const SaharaV3 =  await ethers.getContractFactory("SaharaV3");
    const SaharaV4 =  await ethers.getContractFactory("SaharaV4");

    //initialize with 42
    sahara = await upgrades.deployProxy(Sahara, [42], {initializer: 'setValue'});
    saharaV2 = await upgrades.upgradeProxy(sahara.address, SaharaV2);
    saharaV3 = await upgrades.upgradeProxy(sahara.address, SaharaV3);
    saharaV4 = await upgrades.upgradeProxy(sahara.address, SaharaV4);
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    expect(await saharaV4.retrieve()).to.equal(BigNumber.from('42'))
    await saharaV4.increment()
    expect(await saharaV4.retrieve()).to.equal(BigNumber.from('43'))

    await saharaV2.setValue(100)
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('100'))
  })

  it("should setName and getName correctly in V4", async function () {
    //name() removed, getName() now
    // expect(boxV4).to.not.have.own.property("name")
    expect(saharaV4.name).to.be.undefined
    expect(await saharaV4.getName()).to.equal("Name: ")

    const boxname="my Box V4"
    await saharaV4.setName(boxname)
    expect(await saharaV4.getName()).to.equal("Name: "+boxname)
  })

})