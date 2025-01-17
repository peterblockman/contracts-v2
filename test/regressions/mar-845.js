const assert = require('assert/strict');
const BigNumber = require('bignumber.js');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { checkEventExists } = require('../events');
const { prepareEnvironment, getLastBlockTime } = require('../utils');

const ETH = '0x0000000000000000000000000000000000000000';

describe.skip('MAR-845', () => {
  it('should correctly close offer after 50% purchase', async () => {
    const { owner, alice, bob, usdt, bat, dex, parseLogs } =
      await prepareEnvironment();

    const batAmount = '100000000000000000000';
    const usdtAmount = '12499991140624812000';
    await bat.transfer(alice.address, batAmount);
    await usdt.transfer(bob.address, usdtAmount);

    await bat.connect(alice).approve(dex.address, batAmount);

    let tx = await dex
      .connect(alice)
      .createOffer(bat.address, [usdt.address], batAmount, [usdtAmount], {
        cancelEnabled: true,
        modifyEnabled: false,
        holdTokens: true,
        feeAlice: 5,
        feeBob: 5,
        smallestChunkSize: '1000000000000000000',
        deadline: await getLastBlockTime(),
        minimumSize: 0,
      });
    let receipt = await tx.wait();
    // console.log(receipt.events)
    let id = receipt.events.find((x) => x.event == 'OfferCreated').args[0];
    // console.log(`id: ${id}`)

    await usdt.connect(bob).approve(dex.address, usdtAmount);
    await dex.connect(bob).acceptOffer(id, usdt.address, '6249991140619999000');
    tx = await dex
      .connect(bob)
      .acceptOffer(id, usdt.address, '6250000000000000000');
    receipt = await tx.wait();

    let closedEvent = receipt.events.find((x) => x.event == 'OfferClosed');
    expect(closedEvent).to.not.be.undefined;

    let offer = await dex.getOffer(id);
    expect(offer.active).false;

    // console.log(receipt.events)

    // address tokenAlice,
    // address[] calldata tokenBob,
    // uint256 amountAlice,
    // uint256[] calldata amountBob,
    // MarsBaseCommon.OfferParams calldata offerParameters
    // bool cancelEnabled;
    // bool modifyEnabled;
    // bool holdTokens;
    // uint256 feeAlice;
    // uint256 feeBob;
    // uint256 smallestChunkSize;
    // uint256 deadline;
    // uint256 minimumSize;

    // uint256 offerId = 22
    // address sender = 0x25fa0cc65f8b5db764eb2243b13db4d63b29fd58
    // uint256 blockTimestamp = 1652262319
    // MarsBaseCommon.MBOffer offer = 128
    // bool active = 1
    // bool minimumMet = 0
    // OfferType offerType = 3
    // uint256 offerId = 22
    // uint256 amountAlice = 100000000000000000000
    // uint256 feeAlice = 5
    // uint256 feeBob = 5
    // uint256 smallestChunkSize = 1000000000000000000
    // uint256 minimumSize = 0
    // uint256 deadline = 1652348675948
    // uint256 amountRemaining = 100000000000000000000
    // address offerer = 0x25fa0cc65f8b5db764eb2243b13db4d63b29fd58
    // address payoutAddress = 0x25fa0cc65f8b5db764eb2243b13db4d63b29fd58
    // address tokenAlice = 0xafb688592905bc2acf3e97f5e81ae41580a670cd
    // bool[] capabilities =
    // uint256[] amountBob = 12499991140624812000
    // // uint256[] minimumOrderAmountsAlice = 0
    // // uint256[] minimumOrderAmountsBob = 0
    // // address[] minimumOrderAddresses = 0
    // // address[] minimumOrderTokens = 0
    // address[] tokenBob = 0x3cb0ebad9f5182046656e36d56abfade08767f6b
    672;
    800;
    864;
    896;
    928;
    960;
    992;
    3;
    1;
    1;
    0;
    1;

    // const approvalAmount = ethers.utils.parseEther("1000000")
    // const amountAlice = ethers.utils.parseEther("50")
    // const amountBob = [ethers.utils.parseEther("10"), ethers.utils.parseEther("20"), ethers.utils.parseEther("20")]

    // Approve the contract to move our tokens
    // await testToken.approve(dex.address, approvalAmount)
    // await usdt.approve(dex.address, approvalAmount)
    // await epicCoin.approve(dex.address, approvalAmount)

    // Make a list of tokens we are willing to accept
    // tokensBob = [usdt.address, epicCoin.address, zeroToken]
  });
  it('should correctly calculate with round prices', async () => {
    const { owner, alice, bob, usdt, bat, dex, parseLogs } =
      await prepareEnvironment();

    // console.log(99)

    const batAmount = '100000000000000000000';
    const usdtAmount = '200000000000000000000';
    await bat.transfer(alice.address, batAmount);
    await usdt.transfer(bob.address, usdtAmount);

    // console.log(98)
    await bat.connect(alice).approve(dex.address, batAmount);

    // console.log(97)
    let tx = await dex
      .connect(alice)
      .createOffer(bat.address, [usdt.address], batAmount, [usdtAmount], {
        cancelEnabled: true,
        modifyEnabled: false,
        holdTokens: true,
        feeAlice: 5,
        feeBob: 5,
        smallestChunkSize: '1000000000000000000',
        deadline: (await getLastBlockTime()) + 86400,
        minimumSize: 0,
      });
    // console.log(96)
    let receipt = await tx.wait();
    // console.log(95)
    // console.log(receipt.events)
    let id = receipt.events.find((x) => x.event == 'OfferCreated').args[0];
    // console.log(94)
    // console.log(`id: ${id}`)

    await usdt.connect(bob).approve(dex.address, usdtAmount);

    await dex
      .connect(bob)
      .acceptOffer(id, usdt.address, '50000000000000000000');
    tx = await dex
      .connect(bob)
      .acceptOffer(id, usdt.address, '150000000000000000000');

    receipt = await tx.wait();

    checkEventExists(parseLogs(receipt.logs), 'OfferClosed');

    let [offer] = await dex.getAllOffers();
    expect(offer.amountRemaining).to.equal(0);
    expect(await usdt.balanceOf(bob.address)).to.equal('0');
    expect(await usdt.balanceOf(alice.address)).to.equal(
      '199000000000000000000'
    );
    expect(await bat.balanceOf(bob.address)).to.equal('99500000000000000000');
    expect(await bat.balanceOf(alice.address)).to.equal('0');
    expect(offer.active).false;
  });
  it('should correctly calculate with round prices and small delta remaining', async () => {
    const { owner, alice, bob, usdt, bat, dex, parseLogs } =
      await prepareEnvironment();

    // console.log(99)

    const batAmount = '100000000000000000000';
    const usdtAmount = '200000000000000000000';
    await bat.transfer(alice.address, batAmount);
    await usdt.transfer(bob.address, usdtAmount);

    // console.log(98)
    await bat.connect(alice).approve(dex.address, batAmount);

    // console.log(97)
    let tx = await dex
      .connect(alice)
      .createOffer(bat.address, [usdt.address], batAmount, [usdtAmount], {
        cancelEnabled: true,
        modifyEnabled: false,
        holdTokens: true,
        feeAlice: 5,
        feeBob: 5,
        smallestChunkSize: '1000000000000000000',
        deadline: (await getLastBlockTime()) + 86400,
        minimumSize: 0,
      });
    // console.log(96)
    let receipt = await tx.wait();
    // console.log(95)
    // console.log(receipt.events)
    let id = receipt.events.find((x) => x.event == 'OfferCreated').args[0];
    // console.log(94)
    // console.log(`id: ${id}`)

    await usdt.connect(bob).approve(dex.address, usdtAmount);

    await dex
      .connect(bob)
      .acceptOffer(
        id,
        usdt.address,
        new BigNumber('50000000000000000000').minus(2).toFixed()
      );
    tx = await dex
      .connect(bob)
      .acceptOffer(id, usdt.address, '150000000000000000000');
    receipt = await tx.wait();

    let [offer] = await dex.getAllOffers();
    expect(offer.amountRemaining).to.equal(0);
    expect(await usdt.balanceOf(bob.address)).to.equal('2');
    expect(await usdt.balanceOf(alice.address)).to.equal(
      new BigNumber('199000000000000000000').minus(2).toFixed()
    );
    expect(await bat.balanceOf(bob.address)).to.equal(
      new BigNumber('99500000000000000000').minus(1).toFixed()
    );
    expect(await bat.balanceOf(alice.address)).to.equal('1');
    expect(offer.active).false;

    checkEventExists(parseLogs(receipt.logs), 'OfferClosed');
  });
  it('should correctly calculate with round prices and small delta remaining and 0 fee', async () => {
    const { owner, alice, bob, usdt, bat, dex, parseLogs } =
      await prepareEnvironment();

    // console.log(99)

    const batAmount = '100000000000000000000';
    const usdtAmount = '200000000000000000000';
    await bat.transfer(alice.address, batAmount);
    await usdt.transfer(bob.address, usdtAmount);

    // console.log(98)
    await bat.connect(alice).approve(dex.address, batAmount);

    // console.log(97)
    let tx = await dex
      .connect(alice)
      .createOffer(bat.address, [usdt.address], batAmount, [usdtAmount], {
        cancelEnabled: true,
        modifyEnabled: false,
        holdTokens: true,
        feeAlice: 0,
        feeBob: 0,
        smallestChunkSize: '1000000000000000000',
        deadline: (await getLastBlockTime()) + 86400,
        minimumSize: 0,
      });
    // console.log(96)
    let receipt = await tx.wait();
    // console.log(95)
    // console.log(receipt.events)
    let id = receipt.events.find((x) => x.event == 'OfferCreated').args[0];
    // console.log(94)
    // console.log(`id: ${id}`)

    await usdt.connect(bob).approve(dex.address, usdtAmount);

    await dex
      .connect(bob)
      .acceptOffer(
        id,
        usdt.address,
        new BigNumber('50000000000000000000').minus(2).toFixed()
      );
    tx = await dex
      .connect(bob)
      .acceptOffer(id, usdt.address, '150000000000000000000');
    receipt = await tx.wait();

    let [offer] = await dex.getAllOffers();
    expect(offer.amountRemaining).to.equal(0);
    expect(await usdt.balanceOf(bob.address)).to.equal('2');
    expect(await usdt.balanceOf(alice.address)).to.equal(
      new BigNumber('200000000000000000000').minus(2).toFixed()
    );
    expect(await bat.balanceOf(bob.address)).to.equal(
      new BigNumber('100000000000000000000').minus(1).toFixed()
    );
    expect(await bat.balanceOf(alice.address)).to.equal('1');
    expect(offer.active).false;

    let closedEvent = receipt.events.find((x) => x.event == 'OfferClosed');
    expect(closedEvent).to.not.be.undefined;
  });
  it('should correctly calculate with super small round prices and big delta remaining and 0 fee', async () => {
    const { owner, alice, bob, usdt, bat, dex, parseLogs } =
      await prepareEnvironment();

    // console.log(99)

    const batAmount = '100';
    const usdtAmount = '200';
    await bat.transfer(alice.address, batAmount);
    await usdt.transfer(bob.address, usdtAmount);

    // console.log(98)
    await bat.connect(alice).approve(dex.address, batAmount);

    // console.log(97)
    let tx = await dex
      .connect(alice)
      .createOffer(bat.address, [usdt.address], batAmount, [usdtAmount], {
        cancelEnabled: true,
        modifyEnabled: false,
        holdTokens: false,
        feeAlice: 0,
        feeBob: 0,
        smallestChunkSize: '1',
        deadline: (await getLastBlockTime()) + 86400,
        minimumSize: 0,
      });
    // console.log(96)
    let receipt = await tx.wait();
    // console.log(95)
    // console.log(receipt.events)
    let id = receipt.events.find((x) => x.event == 'OfferCreated').args[0];
    // console.log(94)
    // console.log(`id: ${id}`)

    await usdt.connect(bob).approve(dex.address, usdtAmount);

    tx = await dex.connect(bob).acceptOffer(id, usdt.address, '198');
    receipt = await tx.wait();

    let [offer] = await dex.getAllOffers();
    expect(offer.amountRemaining).to.equal(1);
    expect(await bat.balanceOf(alice.address)).to.equal('0');
    expect(await bat.balanceOf(bob.address)).to.equal('99');
    expect(await usdt.balanceOf(bob.address)).to.equal('2');
    expect(await usdt.balanceOf(alice.address)).to.equal('198');
    expect(offer.active).true;

    let closedEvent = receipt.events.find((x) => x.event == 'OfferClosed');
    expect(closedEvent).to.be.undefined;
  });
  it('should correctly close and calculate with small round prices and small delta remaining and 0 fee', async () => {
    const { owner, alice, bob, usdt, bat, dex, parseLogs } =
      await prepareEnvironment();

    // console.log(99)

    const batAmount = '1000000000';
    const usdtAmount = '2000000000';
    await bat.transfer(alice.address, batAmount);
    await usdt.transfer(bob.address, usdtAmount);

    // console.log(98)
    await bat.connect(alice).approve(dex.address, batAmount);

    // console.log(97)
    let tx = await dex
      .connect(alice)
      .createOffer(bat.address, [usdt.address], batAmount, [usdtAmount], {
        cancelEnabled: true,
        modifyEnabled: false,
        holdTokens: true,
        feeAlice: 0,
        feeBob: 0,
        smallestChunkSize: '1000000',
        deadline: (await getLastBlockTime()) + 86400,
        minimumSize: 0,
      });
    // console.log(96)
    let receipt = await tx.wait();
    // console.log(95)
    // console.log(receipt.events)
    let id = receipt.events.find((x) => x.event == 'OfferCreated').args[0];
    // console.log(94)
    // console.log(`id: ${id}`)

    await usdt.connect(bob).approve(dex.address, usdtAmount);

    tx = await dex.connect(bob).acceptOffer(id, usdt.address, '1999999998');
    receipt = await tx.wait();

    let [offer] = await dex.getAllOffers();
    expect(offer.amountRemaining).to.equal(0);
    expect(await bat.balanceOf(alice.address)).to.equal('1');
    expect(await bat.balanceOf(bob.address)).to.equal('999999999');
    expect(await usdt.balanceOf(bob.address)).to.equal('2');
    expect(await usdt.balanceOf(alice.address)).to.equal('1999999998');
    expect(offer.active).false;

    let closedEvent = receipt.events.find((x) => x.event == 'OfferClosed');
    expect(closedEvent).to.not.be.undefined;
  });
});
