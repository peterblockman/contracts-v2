const assert = require('assert/strict');
const BigNumber = require('bignumber.js');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { checkEventExists } = require('../events');
const { prepareEnvironment, getLastBlockTime } = require('../utils');

const ETH = '0x0000000000000000000000000000000000000000';

describe('MAR-842', () => {
  it('allow eth to be purchased for tokens with a static offer', async () => {
    const { owner, alice, bob, usdt, bat, dex, parseLogs } =
      await prepareEnvironment();

    // console.log(99)

    const ethAmount = '100000000000000000000';
    const usdtAmount = '100000000000000000000';
    await usdt.transfer(bob.address, usdtAmount);

    // console.log(97)
    let tx = await dex.connect(alice).createOffer(
      ETH,
      [usdt.address],
      ethAmount,
      [usdtAmount],
      {
        cancelEnabled: true,
        modifyEnabled: false,
        holdTokens: true,
        feeAlice: 5,
        feeBob: 5,
        smallestChunkSize: '0',
        deadline: (await getLastBlockTime()) + 86400,
        minimumSize: '1000000000000000000',
      },
      { value: ethAmount }
    );
    // console.log(96)
    let receipt = await tx.wait();
    // console.log(95)
    // console.log(receipt.events)
    // console.log(94)
    // console.log(`id: ${id}`)

    await usdt.connect(bob).approve(dex.address, usdtAmount);

    tx = await dex
      .connect(bob)
      .acceptOffer(0, usdt.address, '60000000000000000');

    receipt = await tx.wait();

    checkEventExists(
      parseLogs(receipt.logs),
      'OfferAccepted',
      {
        amountAliceReceived: '59700000000000000',
        amountBobReceived: '59700000000000000',
        feeAlice: '300000000000000',
        feeBob: '300000000000000',
        tokenAddressAlice: ETH,
        tokenAddressBob: usdt.address,
      },
      { exhaustive: false }
    );
  });
  it('should fail for 0 eth bid', async () => {
    const { owner, alice, bob, usdt, bat, dex, parseLogs } =
      await prepareEnvironment();

    const ethAmount = '100000000000000000000';
    const usdtAmount = '100000000000000000000';
    await usdt.transfer(bob.address, usdtAmount);

    await usdt.connect(bob).approve(dex.address, usdtAmount);
    let tx = await dex.connect(bob).createOffer(
      usdt.address,
      [ETH],
      usdtAmount,
      [ethAmount],
      {
        cancelEnabled: true,
        modifyEnabled: false,
        holdTokens: true,
        feeAlice: 5,
        feeBob: 5,
        smallestChunkSize: '0',
        deadline: (await getLastBlockTime()) + 86400,
        minimumSize: '1000000000000000000',
      },
      {}
    );
    // console.log(96)
    let receipt = await tx.wait();
    // console.log(95)
    // console.log(receipt.events)
    // console.log(94)
    // console.log(`id: ${id}`)

    let ptx = dex.connect(alice).acceptOffer(0, ETH, '60000000000000000');

    await expect(ptx).to.be.revertedWith('403-C1');
  });
  it('allow tokens to be purchased for eth with static offer', async () => {
    const { owner, alice, bob, usdt, bat, dex, parseLogs } =
      await prepareEnvironment();

    const ethAmount = '100000000000000000000';
    const usdtAmount = '100000000000000000000';
    await usdt.transfer(bob.address, usdtAmount);

    await usdt.connect(bob).approve(dex.address, usdtAmount);
    let tx = await dex.connect(bob).createOffer(
      usdt.address,
      [ETH],
      usdtAmount,
      [ethAmount],
      {
        cancelEnabled: true,
        modifyEnabled: false,
        holdTokens: true,
        feeAlice: 5,
        feeBob: 5,
        smallestChunkSize: '0',
        deadline: (await getLastBlockTime()) + 86400,
        minimumSize: '1000000000000000000',
      },
      {}
    );
    // console.log(96)
    let receipt = await tx.wait();
    // console.log(95)
    // console.log(receipt.events)
    // console.log(94)
    // console.log(`id: ${id}`)

    tx = await dex
      .connect(alice)
      .acceptOffer(0, ETH, '60000000000000000', { value: '60000000000000000' });

    receipt = await tx.wait();

    checkEventExists(
      parseLogs(receipt.logs),
      'OfferAccepted',
      {
        amountAliceReceived: '59700000000000000',
        amountBobReceived: '59700000000000000',
        feeAlice: '300000000000000',
        feeBob: '300000000000000',
        tokenAddressAlice: usdt.address,
        tokenAddressBob: ETH,
      },
      { exhaustive: false }
    );
  });
});
