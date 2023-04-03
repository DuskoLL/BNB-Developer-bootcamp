// test/1.Box.test.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("saharaV2", function () {
  let saharaV2:Contract

  beforeEach(async function () {
    const SaharaV2 = await ethers.getContractFactory("SaharaV2")
    saharaV2 = await SaharaV2.deploy()
    await saharaV2.deployed()
  });

  it("should retrievevalue previously stored", async function () {
    await saharaV2.setValue(42)
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('42'))

    await saharaV2.setValue(100)
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('100'))
  });

  it('should increment value correctly', async function () {
    await saharaV2.setValue(42)
    await saharaV2.increment()
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('43'))

    await saharaV2.reduce()
    expect(await saharaV2.retrieve()).to.equal(BigNumber.from('42'))
  })
})