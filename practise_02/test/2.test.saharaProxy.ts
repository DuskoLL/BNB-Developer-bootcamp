
import { ethers, upgrades } from "hardhat"
import { expect } from "chai"
import { Contract, BigNumber } from "ethers"

describe("Sahara (proxy)", function () {
  let sahara:Contract

  beforeEach(async function () {
    const Sahara = await ethers.getContractFactory("Sahara")
        //initilize with 42
        sahara = await upgrades.deployProxy(Sahara, [42], {initializer: 'initialize'})
    })

  it("should retrieve value previously stored", async function () {    
    console.log(sahara.address," sahara(proxy)") 

    expect(await sahara.retrieve()).to.equal(BigNumber.from('42'))

    await sahara.setValue(100)
    expect(await sahara.retrieve()).to.equal(BigNumber.from('100'))
  })

})