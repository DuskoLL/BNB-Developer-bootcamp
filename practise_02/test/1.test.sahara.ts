// test/1.Box.test.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("sahara", function () {
  let sahara:Contract;

  beforeEach(async function () {
    const Sahara = await ethers.getContractFactory("Sahara");
    sahara = await Sahara.deploy();
    await sahara.deployed();
  })

  it("should retrieve value previously stored", async function () {
    await sahara.setValue(42);
    expect(await sahara.retrieve()).to.equal(BigNumber.from('42'));

    await sahara.setValue(100);
    expect(await sahara.retrieve()).to.equal(BigNumber.from('100'));
  })
})