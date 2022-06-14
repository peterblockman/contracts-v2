const assert = require ('assert/strict')
const BigNumber = require ('bignumber.js')
const { expect } = require ("chai")
const { ethers } = require ("hardhat")

const ETH = "0x0000000000000000000000000000000000000000"

const tomorrow = (now = Date.now()) => Math.floor(now / 1000 + 86400)

describe("MAR-1067", () => 
{
    it("should allow the commission exchanger address to be set to the zero address", async () =>
    {
        const [owner, alice, bob, commission] = await ethers.getSigners()

        const MarsBase = await ethers.getContractFactory("MarsBase")
        const m = await MarsBase.deploy()

        const MarsBaseExchange = await ethers.getContractFactory("MarsBaseExchange", {
            libraries: {
                MarsBase: m.address
            }
        })
        console.log(commission.address);
        const dex = await MarsBaseExchange.deploy();

        let commissionTx = await dex.setCommissionAddress(commission.address);
        await expect(commissionTx.wait()).to.not.be.reverted;

        commissionTx = await dex.setCommissionAddress(ETH);
        await expect(commissionTx.wait()).to.not.be.reverted;

    })
});