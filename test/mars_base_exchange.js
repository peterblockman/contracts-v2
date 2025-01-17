const assert = require('assert/strict');
const { default: BigNumber } = require('bignumber.js');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const {
  prepareJustContracts,
  getLastBlockTime,
  prepareEnvironment,
} = require('./utils');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('MarsBaseExchange', async function () {
  beforeEach(async function () {
    const accounts = await ethers.getSigners();

    ({ m, dex } = await prepareJustContracts());

    const USDTCoin = await ethers.getContractFactory('TetherToken');
    const TestToken = await ethers.getContractFactory('TestToken');
    const EPICCoin = await ethers.getContractFactory('EPICCoin');

    testToken = await TestToken.deploy();
    usdt = await USDTCoin.deploy(
      ethers.utils.parseEther('10000000'),
      'Tether',
      'USDT',
      18
    );
    epicCoin = await EPICCoin.deploy();
    userAddress = accounts[0].address;

    approvalAmount = ethers.utils.parseEther('1000000');
    amountAlice = ethers.utils.parseEther('50');
    amountBob = [
      ethers.utils.parseEther('10'),
      ethers.utils.parseEther('20'),
      ethers.utils.parseEther('20'),
    ];

    // Approve the contract to move our tokens
    await testToken.approve(dex.address, approvalAmount);
    await usdt.approve(dex.address, approvalAmount);
    await epicCoin.approve(dex.address, approvalAmount);

    // Zero Address means native ether
    zeroToken = '0x0000000000000000000000000000000000000000';

    // Make a list of tokens we are willing to accept
    tokensBob = [usdt.address, epicCoin.address, zeroToken];
  });

  afterEach(async function () {});

  it('should create an offer', async function () {
    // Define Constants
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;

    // Create Offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString().toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Get the offer and ensure it's all set correctly
    let offer = await dex.getOffer(0);

    assert.equal(offer.active, true);

    assert.equal(amountAlice.toString(), offer.amountAlice.toString());
    assert.equal(amountBob[0].toString(), offer.amountBob[0].toString());
    assert.equal(amountBob[1].toString(), offer.amountBob[1].toString());

    assert.equal(userAddress, offer.offerer);
    assert.equal(userAddress, offer.payoutAddress);

    assert.equal(testToken.address, offer.tokenAlice);
    assert.equal(usdt.address, offer.tokenBob[0]);
    assert.equal(epicCoin.address, offer.tokenBob[1]);

    return;
  });

  it('should not create an offer with a deadline in the past', async function () {
    // Define Constants
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1000');
    const deadline = 100;

    // Create Offer
    assert.rejects(
      dex.createOffer(testToken.address, tokensBob, amountAlice, amountBob, {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString().toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      })
    );

    return;
  });

  it('allows no offer deadline to be set', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;

    // Create Offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Get the offer and ensure it's all set correctly
    let offer = await dex.getOffer(0);

    assert.equal(offer.active, true);
    assert.equal(deadline.toString(), offer.deadline.toString());

    return;
  });

  it('should not create an offer with smallest chunk size larger than amount alice', async function () {
    // Define Constants
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1000');
    const deadline = 0;

    // Create Offer
    assert.rejects(
      dex.createOffer(testToken.address, tokensBob, amountAlice, amountBob, {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString().toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      })
    );

    return;
  });

  it('should not create an offer with minimum size larger than amount alice', async function () {
    // Define Constants
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSizeOver = ethers.utils.parseEther('100000');
    const deadline = 0;

    // Create Offer
    assert.rejects(
      dex.createOffer(testToken.address, tokensBob, amountAlice, amountBob, {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString().toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: minimumSizeOver.toString(),
        holdTokens: false,
      })
    );

    return;
  });

  it('is ownable and owned initially by contract deployer', async function () {
    let owner = await dex.getOwner();

    assert.equal(owner, userAddress);
  });

  it('has offer deadlines', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = (await getLastBlockTime()) + 10000;

    // Create Offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Get the offer and ensure it's all set correctly
    let offer = await dex.getOffer(0);

    assert.equal(offer.active, true);
    assert.equal(deadline.toString(), offer.deadline.toString());

    return;
  });

  // it("can cancel all expired orders", async function () {
  //   const feeAlice = 10;
  //   const feeBob = 20;
  //   const smallestChunkSize = ethers.utils.parseEther("1");
  //   const deadline = await getLastBlockTime() + 10;
  //   const mockedExpireTime = deadline + 11;

  //   // Create Offer
  //   await dex.createOffer(testToken.address, tokensBob, amountAlice, amountBob, {feeAlice: feeAlice, feeBob: feeBob, smallestChunkSize: smallestChunkSize.toString(), deadline: deadline, cancelEnabled: true, modifyEnabled: false, minimumSize: 0, holdTokens: false});

  //   // Get the offer and ensure it's all set correctly
  //   let offer = await dex.getOffer(0);

  //   assert.equal(offer.active, true);
  //   assert.equal(deadline.toString(), offer.deadline);

  //   // await dex._mock_setBlockTimeStamp(mockedExpireTime);
  //   // await o._mock_setBlockTimeStamp(mockedExpireTime);
  //   // await m._mock_setBlockTimeStamp(mockedExpireTime);

  //   // await dex.cancelExpiredOffers();

  //   let cancelledOffer = await dex.getOffer(0);

  //   assert.equal(cancelledOffer.active, false);
  //   assert.equal(cancelledOffer.deadline.toString(), '0');

  //   return;
  // });

  it('can have no offer deadlines', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;

    // Create Offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );
    // Get the offer and ensure it's all set correctly
    let offer = await dex.getOffer(0);

    assert.equal(offer.active, true);
    assert.equal(deadline.toString(), offer.deadline.toString());

    return;
  });

  it('should calculate a price where amountAlice is stronger', async function () {
    // Define Constants
    const amountAlice = ethers.utils.parseEther('5');
    const amountBob = ethers.utils.parseEther('1');
    const feeAlice = 5;
    const feeBob = 5;
    const buyAmount = ethers.utils.parseEther('1');
    const expectedAmount = (buyAmount * amountBob) / amountAlice;

    let price = await dex.price(buyAmount, amountAlice, amountBob);

    assert.equal(price.toString(), expectedAmount.toString());
  });

  it('should calculate a price where amountAlice is weaker', async function () {
    // Define Constants
    const amountAlice = ethers.utils.parseEther('1');
    const amountBob = ethers.utils.parseEther('5');
    const feeAlice = 5;
    const feeBob = 5;
    const buyAmount = ethers.utils.parseEther('1');
    const expectedAmount = (buyAmount * amountBob) / amountAlice;

    let price = await dex.price(buyAmount, amountAlice, amountBob);

    assert.equal(price.toString(), expectedAmount.toString());
  });

  it("should cancel an order if it's allowed", async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;

    // Get users balance and total supply of TestToken
    let initialUserTestTokenBalance = await testToken.balanceOf(userAddress);
    const testTokenTotalSupply = await testToken.totalSupply();

    // Check that it's all assigned to us
    assert.equal(
      initialUserTestTokenBalance.toString(),
      testTokenTotalSupply.toString()
    );

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 2 is a chunked purchase

    // Cancel the offer, thus returning everything to its initial state
    await dex.cancelOffer(0);

    // Get the offer again, this time after it's been cancelled.
    let cancelledOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in is 0
    assert.equal(cancelledOffer.active, false);
    assert.equal(cancelledOffer.amountAlice.toString(), '0');
    assert.equal(cancelledOffer.amountBob.length, 0);
    assert.equal(
      cancelledOffer.tokenAlice,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(cancelledOffer.tokenBob.length, 0);
    assert.equal(
      cancelledOffer.offerer,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(
      cancelledOffer.payoutAddress,
      '0x0000000000000000000000000000000000000000'
    );

    return;
  });

  it('should cancel all offers and migrate', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;

    // Get users balance and total supply of TestToken
    let initialUserTestTokenBalance = await testToken.balanceOf(userAddress);
    const testTokenTotalSupply = await testToken.totalSupply();

    // Check that it's all assigned to us
    assert.equal(
      initialUserTestTokenBalance.toString(),
      testTokenTotalSupply.toString()
    );

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 2 is a chunked purchase

    // Cancel the offer, thus returning everything to its initial state
    await dex.migrateContract();

    // Get the offer again, this time after it's been cancelled.
    let cancelledOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in is 0
    assert.equal(cancelledOffer.active, false);
    assert.equal(cancelledOffer.amountAlice.toString(), '0');
    assert.equal(cancelledOffer.amountBob.length, 0);
    assert.equal(
      cancelledOffer.tokenAlice,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(cancelledOffer.tokenBob.length, 0);
    assert.equal(
      cancelledOffer.offerer,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(
      cancelledOffer.payoutAddress,
      '0x0000000000000000000000000000000000000000'
    );

    // Create the offer
    assert.rejects(
      dex.createOffer(testToken.address, tokensBob, amountAlice, amountBob, {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      })
    );

    return;
  });

  it('should not cancel an order if its disabled', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;

    // Get users balance and total supply of TestToken
    let initialUserTestTokenBalance = await testToken.balanceOf(userAddress);
    const testTokenTotalSupply = await testToken.totalSupply();

    // Check that it's all assigned to us
    assert.equal(
      initialUserTestTokenBalance.toString(),
      testTokenTotalSupply.toString()
    );

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: false,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 2 is a chunked purchase

    // Cancel the offer, thus returning everything to its initial state
    assert.rejects(dex.cancelOffer(0, 2));
    return;
  });

  it('should complete an order', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = 0;
    const deadline = 0;
    const amountAfterFeeAlice = (amountAlice * (1000 - feeAlice)) / 1000;
    const amountAfterFeeBob = (amountBob[1] * (1000 - feeBob)) / 1000;

    // Get users balance and total supply of TestToken and USDT
    let initialUserTestTokenBalance = await testToken.balanceOf(userAddress);
    const testTokenTotalSupply = await testToken.totalSupply();

    let initialUserEpicCoinBalance = await epicCoin.balanceOf(userAddress);
    const epicCoinTotalSupply = await epicCoin.totalSupply();

    // Check that it's all assigned to us
    assert.equal(
      initialUserTestTokenBalance.toString(),
      testTokenTotalSupply.toString()
    );
    assert.equal(
      initialUserEpicCoinBalance.toString(),
      epicCoinTotalSupply.toString()
    );

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 0 is Full Purchase

    let block = await ethers.provider.getBlock('latest');

    let blockTimestamp = block.timestamp + 1;

    // Cancel the offer, thus returning everything to its initial state
    await dex.acceptOffer(0, tokensBob[1], amountBob[1]);

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in/out is 0
    assert.equal(acceptedOffer.active, false);
    assert.equal(acceptedOffer.amountAlice.toString(), '0');
    assert.equal(acceptedOffer.amountBob.length, 0);
    assert.equal(
      acceptedOffer.tokenAlice,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(acceptedOffer.tokenBob.length, 0);
    assert.equal(
      acceptedOffer.offerer,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(
      acceptedOffer.payoutAddress,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(acceptedOffer.deadline.toString(), deadline.toString());

    return;
  });

  it('should not allow purchases less than smallestChunckSize a dynamic offer', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = 1000000;
    const deadline = 0;
    const amountAfterFeeAlice = (amountAlice * (1000 - feeAlice)) / 1000;
    const amountAfterFeeBob = (amountBob[1] * (1000 - feeBob)) / 1000;

    // Get users balance and total supply of TestToken and USDT
    let initialUserTestTokenBalance = await testToken.balanceOf(userAddress);
    const testTokenTotalSupply = await testToken.totalSupply();

    let initialUserEpicCoinBalance = await epicCoin.balanceOf(userAddress);
    const epicCoinTotalSupply = await epicCoin.totalSupply();

    // Check that it's all assigned to us
    assert.equal(
      initialUserTestTokenBalance.toString(),
      testTokenTotalSupply.toString()
    );
    assert.equal(
      initialUserEpicCoinBalance.toString(),
      epicCoinTotalSupply.toString()
    );

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    assert.rejects(dex.acceptOffer(0, tokensBob[1], 1));

    return;
  });

  it('should not allow purchases less than smallestChunckSize a static offer', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = 1000000;
    const deadline = 0;
    const amountAfterFeeAlice = (amountAlice * (1000 - feeAlice)) / 1000;
    const amountAfterFeeBob = (amountBob[1] * (1000 - feeBob)) / 1000;

    // Get users balance and total supply of TestToken and USDT
    let initialUserTestTokenBalance = await testToken.balanceOf(userAddress);
    const testTokenTotalSupply = await testToken.totalSupply();

    let initialUserEpicCoinBalance = await epicCoin.balanceOf(userAddress);
    const epicCoinTotalSupply = await epicCoin.totalSupply();

    // Check that it's all assigned to us
    assert.equal(
      initialUserTestTokenBalance.toString(),
      testTokenTotalSupply.toString()
    );
    assert.equal(
      initialUserEpicCoinBalance.toString(),
      epicCoinTotalSupply.toString()
    );

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: smallestChunkSize.toString(),
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    assert.rejects(dex.acceptOffer(0, tokensBob[1], 1));

    return;
  });

  it('should complete an order for native ether', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const deadline = 0;
    const smallestChunkSize = 0;
    const amountAfterFeeAlice = (amountAlice * (1000 - feeAlice)) / 1000;
    const amountAfterFeeBob = (amountBob[1] * (1000 - feeBob)) / 1000;

    // Get users balance and total supply of TestToken and USDT
    let initialUserTestTokenBalance = await testToken.balanceOf(userAddress);
    const testTokenTotalSupply = await testToken.totalSupply();

    let initialUserEpicCoinBalance = await epicCoin.balanceOf(userAddress);
    const epicCoinTotalSupply = await epicCoin.totalSupply();

    // Check that it's all assigned to us
    assert.equal(
      initialUserTestTokenBalance.toString(),
      testTokenTotalSupply.toString()
    );
    assert.equal(
      initialUserEpicCoinBalance.toString(),
      epicCoinTotalSupply.toString()
    );

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 0 is Full Purchase

    // Cancel the offer, thus returning everything to its initial state
    await dex.acceptOffer(0, tokensBob[2], amountBob[2], {
      value: amountBob[2],
    });

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in/out is 0
    assert.equal(acceptedOffer.active, false);
    assert.equal(acceptedOffer.amountAlice.toString(), '0');
    assert.equal(acceptedOffer.amountBob.length, 0);
    assert.equal(
      acceptedOffer.tokenAlice,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(acceptedOffer.tokenBob.length, 0);
    assert.equal(
      acceptedOffer.offerer,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(
      acceptedOffer.payoutAddress,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(acceptedOffer.deadline.toString(), deadline.toString());

    return;
  });

  it('should get all open orders', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = 0;
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 0 is Full Purchase

    // Cancel the offer, thus returning everything to its initial state
    await dex.acceptOffer(0, tokensBob[1], amountBob[1]);

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in/out is 0
    assert.equal(acceptedOffer.active, false);
    assert.equal(acceptedOffer.amountAlice.toString(), '0');
    assert.equal(acceptedOffer.amountBob.length, 0);
    assert.equal(
      acceptedOffer.tokenAlice,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(acceptedOffer.tokenBob.length, 0);
    assert.equal(
      acceptedOffer.offerer,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(
      acceptedOffer.payoutAddress,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(acceptedOffer.deadline.toString(), deadline.toString());

    // Ensure that only the second offer is open
    let offers = await dex.getAllOffers();
    assert.equal(offers.length, 1);
    assert.equal(offers[0].offerId.toString(), '1');
    assert.equal(offers[0].active, true);

    return;
  });

  it('should accept part of an order', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;
    const conversionnRate = amountAlice / amountBob[1];
    const amountAfterFeeAlice = (smallestChunkSize * (1000 - feeAlice)) / 1000;
    const amountAfterFeeBob = (smallestChunkSize * (1000 - feeBob)) / 1000;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 0 is Full Purchase

    // Cancel the offer, thus returning everything to its initial state
    await dex.acceptOffer(0, tokensBob[1], smallestChunkSize);

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in/out is 0
    assert.equal(acceptedOffer.active, true);
    assert.equal(acceptedOffer.amountAlice.toString(), amountAlice.toString());
    assert.equal(
      acceptedOffer.amountRemaining.toString(),
      (amountAlice - smallestChunkSize * conversionnRate).toString()
    );
    assert.equal(acceptedOffer.amountBob.length, 3);
    assert.equal(acceptedOffer.tokenAlice, testToken.address);
    assert.equal(acceptedOffer.tokenBob.length, 3);
    assert.equal(acceptedOffer.offerer, userAddress);
    assert.equal(acceptedOffer.payoutAddress, userAddress);
    assert.equal(acceptedOffer.deadline.toString(), '0');

    return;
  });

  it('should accept part of an order for native ether', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;
    const conversionnRate = amountAlice / amountBob[1];
    const amountAfterFeeAlice = (smallestChunkSize * (1000 - feeAlice)) / 1000;
    const amountAfterFeeBob = (smallestChunkSize * (1000 - feeBob)) / 1000;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 0 is Full Purchase

    // Cancel the offer, thus returning everything to its initial state
    await dex.acceptOffer(0, tokensBob[1], smallestChunkSize, {
      value: smallestChunkSize,
    });

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in/out is 0
    assert.equal(acceptedOffer.active, true);
    assert.equal(acceptedOffer.amountAlice.toString(), amountAlice.toString());
    assert.equal(
      acceptedOffer.amountRemaining.toString(),
      (amountAlice - smallestChunkSize * conversionnRate).toString()
    );
    assert.equal(acceptedOffer.amountBob.length, 3);
    assert.equal(acceptedOffer.tokenAlice, testToken.address);
    assert.equal(acceptedOffer.tokenBob.length, 3);
    assert.equal(acceptedOffer.offerer, userAddress);
    assert.equal(acceptedOffer.payoutAddress, userAddress);
    assert.equal(acceptedOffer.deadline.toString(), '0');

    return;
  });

  it.skip('should allow price changes if allowed', async function () {
    const changedAmountsBob = [ethers.utils.parseEther('20')];
    const changedTokensBob = [tokensBob[1]];
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;
    const conversionnRate = amountAlice / amountBob[0];
    const amountAfterFeeAlice = (smallestChunkSize * (1000 - feeAlice)) / 1000;
    const amountAfterFeeBob = (smallestChunkSize * (1000 - feeBob)) / 1000;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: true,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 0 is Full Purchase

    // Ensure it's got all the right info
    assert.equal(offer.active, true);
    assert.equal(offer.amountBob.length, 3);
    assert.equal(offer.tokenAlice, testToken.address);
    assert.equal(offer.tokenBob.length, 3);

    // Cancel the offer, thus returning everything to its initial state
    await dex.changeOfferParams(0, changedTokensBob, changedAmountsBob, {
      feeAlice: feeAlice,
      feeBob: feeBob,
      smallestChunkSize: smallestChunkSize.toString(),
      deadline: deadline,
      cancelEnabled: true,
      modifyEnabled: false,
      minimumSize: 0,
      holdTokens: false,
    });

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure it's got all the right info
    assert.equal(acceptedOffer.active, true);
    assert.equal(acceptedOffer.amountAlice.toString(), amountAlice.toString());
    assert.equal(
      acceptedOffer.amountRemaining.toString(),
      amountAlice.toString()
    );
    assert.equal(acceptedOffer.amountBob.length, 1);
    assert.equal(acceptedOffer.tokenAlice, testToken.address);
    assert.equal(acceptedOffer.tokenBob.length, 1);
    assert.equal(acceptedOffer.offerer, userAddress);
    assert.equal(acceptedOffer.payoutAddress, userAddress);
    assert.equal(acceptedOffer.deadline.toString(), '0');

    return;
  });

  it.skip('should reject price changes if its disabled', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;
    const conversionnRate = amountAlice / amountBob[0];
    const amountAfterFeeAlice = (smallestChunkSize * (1000 - feeAlice)) / 1000;
    const amountAfterFeeBob = (smallestChunkSize * (1000 - feeBob)) / 1000;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: false,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 0 is Full Purchase

    // Ensure it's got all the right info
    assert.equal(offer.active, true);
    assert.equal(offer.amountBob.length, 3);
    assert.equal(offer.tokenAlice, testToken.address);
    assert.equal(offer.tokenBob.length, 3);

    // Cancel the offer, thus returning everything to its initial state
    assert.rejects(
      dex.changeOfferParams(0, tokensBob, amountBob, [
        feeAlice,
        feeBob,
        2,
        deadline,
      ])
    );

    return;
  });

  it.skip('should allow minimum chunk size changes', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const changedSmallestChunkSize = 1;
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: true,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 0 is Full Purchase

    // Ensure it's got all the right info
    assert.equal(offer.active, true);
    assert.equal(offer.amountBob.length, 3);
    assert.equal(offer.tokenAlice, testToken.address);
    assert.equal(offer.tokenBob.length, 3);
    assert.equal(
      offer.smallestChunkSize.toString(),
      smallestChunkSize.toString()
    );

    // Cancel the offer, thus returning everything to its initial state
    await dex.changeOfferParams(0, tokensBob, tokensBob, {
      feeAlice: feeAlice,
      feeBob: feeBob,
      smallestChunkSize: changedSmallestChunkSize,
      deadline: deadline,
      cancelEnabled: true,
      modifyEnabled: false,
      minimumSize: 0,
      holdTokens: false,
    });

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure it's got all the right info
    assert.equal(acceptedOffer.active, true);
    assert.equal(acceptedOffer.amountAlice.toString(), amountAlice.toString());
    assert.equal(
      acceptedOffer.amountRemaining.toString(),
      amountAlice.toString()
    );
    assert.equal(acceptedOffer.amountBob.length, 3);
    assert.equal(acceptedOffer.tokenAlice, testToken.address);
    assert.equal(acceptedOffer.tokenBob.length, 3);
    assert.equal(
      acceptedOffer.smallestChunkSize.toString(),
      changedSmallestChunkSize.toString()
    );
    assert.equal(acceptedOffer.offerer, userAddress);
    assert.equal(acceptedOffer.payoutAddress, userAddress);
    assert.equal(acceptedOffer.deadline.toString(), '0');

    return;
  });

  it('should close the order if all of an order is requested for part of an order', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 0 is Full Purchase

    // Cancel the offer, thus returning everything to its initial state
    await dex.acceptOffer(0, tokensBob[1], amountBob[1]);

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in/out is 0
    assert.equal(acceptedOffer.active, false);
    assert.equal(acceptedOffer.amountAlice.toString(), '0');
    assert.equal(acceptedOffer.amountRemaining.toString(), '0');
    assert.equal(acceptedOffer.amountBob.length, 0);
    assert.equal(
      acceptedOffer.tokenAlice,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(acceptedOffer.tokenBob.length, 0);
    assert.equal(
      acceptedOffer.offerer,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(
      acceptedOffer.payoutAddress,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(acceptedOffer.deadline.toString(), deadline.toString());

    return;
  });

  it('should close the order if all of an order is requested for part of an order with native ether', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: 0,
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 0 is Full Purchase

    // Cancel the offer, thus returning everything to its initial state
    await dex.acceptOffer(0, tokensBob[2], amountBob[2], {
      value: amountBob[2],
    });

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in/out is 0
    assert.equal(acceptedOffer.active, false);
    assert.equal(acceptedOffer.amountAlice.toString(), '0');
    assert.equal(acceptedOffer.amountRemaining.toString(), '0');
    assert.equal(acceptedOffer.amountBob.length, 0);
    assert.equal(
      acceptedOffer.tokenAlice,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(acceptedOffer.tokenBob.length, 0);
    assert.equal(
      acceptedOffer.offerer,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(
      acceptedOffer.payoutAddress,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(acceptedOffer.deadline.toString(), deadline.toString());

    return;
  });

  it('should hold tokens if the order minimum is not reached', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSale = ethers.utils.parseEther('20');
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: false,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: true,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 3 is Chunked Order with Minimum and No Expiration Time

    // Accept part of the offer without going over the minimum
    await dex.acceptOffer(0, tokensBob[1], smallestChunkSize);

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    const conversionnRate = amountAlice / amountBob[1];

    // Ensure everything adds up
    assert.equal(acceptedOffer.active, true);
    assert.equal(acceptedOffer.amountAlice.toString(), amountAlice.toString());
    assert.equal(
      acceptedOffer.amountRemaining.toString(),
      '47500000000000000000'
    );
    assert.equal(acceptedOffer.amountBob.length, 3);
    assert.equal(acceptedOffer.tokenAlice, testToken.address);
    assert.equal(acceptedOffer.tokenBob.length, 3);
    assert.equal(acceptedOffer.offerer, userAddress);
    assert.equal(acceptedOffer.payoutAddress, userAddress);
    assert.equal(acceptedOffer.deadline.toString(), '0');
    assert.equal(acceptedOffer.minimumOrderAddresses[0], userAddress);
    assert.equal(
      acceptedOffer.minimumOrderAmountsBob[0].toString(),
      smallestChunkSize.toString()
    );
    assert.equal(
      acceptedOffer.minimumOrderAmountsAlice[0].toString(),
      (smallestChunkSize * conversionnRate).toString()
    );
    assert.equal(acceptedOffer.minimumOrderTokens[0], tokensBob[1]);

    return;
  });

  it('should hold native ether if the order minimum is not reached', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSale = ethers.utils.parseEther('20');
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: false,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: true,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 3 is Chunked Order with Minimum and No Expiration Time

    // Accept part of the offer without going over the minimum
    await dex.acceptOffer(0, tokensBob[2], smallestChunkSize, {
      value: smallestChunkSize,
    });

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    const conversionnRate = (amountAlice / amountBob[2]) * 20;

    // Ensure everything adds up
    assert.equal(acceptedOffer.active, true);
    assert.equal(acceptedOffer.amountAlice.toString(), amountAlice.toString());
    assert.equal(
      acceptedOffer.amountRemaining.toString(),
      '47500000000000000000'
    );
    assert.equal(acceptedOffer.amountBob.length, 3);
    assert.equal(acceptedOffer.tokenAlice, testToken.address);
    assert.equal(acceptedOffer.tokenBob.length, 3);
    assert.equal(acceptedOffer.offerer, userAddress);
    assert.equal(acceptedOffer.payoutAddress, userAddress);
    assert.equal(acceptedOffer.deadline.toString(), '0');
    assert.equal(acceptedOffer.minimumOrderAddresses[0], userAddress);
    assert.equal(
      acceptedOffer.minimumOrderAmountsBob[0].toString(),
      smallestChunkSize.toString()
    );
    assert.equal(
      acceptedOffer.minimumOrderAmountsAlice[0].toString(),
      '2500000000000000000'
    );
    assert.equal(acceptedOffer.minimumOrderTokens[0], tokensBob[2]);

    return;
  });

  it("should fail if maximum minimumOrderTokens's length reached", async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSale = ethers.utils.parseEther('20');
    const deadline = 0;

    await dex.setMaxMinimumOrderTokensLength(1);

    expect(await dex.maxMinimumOrderTokensLength()).equal('1');

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: false,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: true,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 3 is Chunked Order with Minimum and No Expiration Time

    // Accept part of the offer without going over the minimum
    await dex.acceptOffer(0, tokensBob[0], smallestChunkSize);
    expect(
      dex.acceptOffer(0, tokensBob[1], smallestChunkSize)
    ).to.be.revertedWith('406-MAXMOTLE');

    return;
  });

  it('should fail if use feeAlice and feeBob that are greater than the maximum fee', async function () {
    const feeAlice = 1200;
    const feeBob = 300;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSale = ethers.utils.parseEther('20');
    const deadline = 0;

    // Create the offer
    const failedOffer = dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: false,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: true,
      }
    );

    await expect(failedOffer).to.be.revertedWith('400-FI');

    return;
  });

  it('should fail if use feeAlice and feeBob that are smaller than the minimum fee', async function () {
    const feeAlice = 1;
    const feeBob = 2;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSale = ethers.utils.parseEther('20');
    const deadline = 0;

    await dex.setMinimumFee(5); // 0.5%

    // Create the offer
    const failedOffer = dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: false,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: true,
      }
    );

    await expect(failedOffer).to.be.revertedWith('400-FI');

    return;
  });

  it('should send tokens if the order minimum is reached', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSale = ethers.utils.parseEther('10');
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString().toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 3 is Chunked Order with Minimum and No Expiration Time

    // Accept part of the offer without going over the minimum
    await dex.acceptOffer(0, tokensBob[1], minimumSale);

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure everything adds up
    assert.equal(acceptedOffer.active, true);
    assert.equal(acceptedOffer.amountAlice.toString(), amountAlice.toString());
    assert.equal(
      acceptedOffer.amountRemaining.toString(),
      '25000000000000000000'
    );
    assert.equal(acceptedOffer.amountBob.length, 3);
    assert.equal(acceptedOffer.tokenAlice, testToken.address);
    assert.equal(acceptedOffer.tokenBob.length, 3);
    assert.equal(acceptedOffer.offerer, userAddress);
    assert.equal(acceptedOffer.payoutAddress, userAddress);
    assert.equal(acceptedOffer.deadline.toString(), '0');
    assert.equal(acceptedOffer.minimumOrderAddresses.length, 0);
    assert.equal(acceptedOffer.minimumOrderAmountsBob.length, 0);
    assert.equal(acceptedOffer.minimumOrderAmountsAlice.length, 0);
    assert.equal(acceptedOffer.minimumOrderTokens.length, 0);

    return;
  });

  it('should send ether if the order minimum is reached', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSale = ethers.utils.parseEther('10');
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString().toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: false,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 3 is Chunked Order with Minimum and No Expiration Time

    // Accept part of the offer without going over the minimum
    await dex.acceptOffer(0, tokensBob[2], minimumSale, { value: minimumSale });

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    // Ensure everything adds up
    assert.equal(acceptedOffer.active, true);
    assert.equal(acceptedOffer.amountAlice.toString(), amountAlice.toString());
    assert.equal(
      acceptedOffer.amountRemaining.toString(),
      '25000000000000000000'
    );
    assert.equal(acceptedOffer.amountBob.length, 3);
    assert.equal(acceptedOffer.tokenAlice, testToken.address);
    assert.equal(acceptedOffer.tokenBob.length, 3);
    assert.equal(acceptedOffer.offerer, userAddress);
    assert.equal(acceptedOffer.payoutAddress, userAddress);
    assert.equal(acceptedOffer.deadline.toString(), '0');
    assert.equal(acceptedOffer.minimumOrderAddresses.length, 0);
    assert.equal(acceptedOffer.minimumOrderAmountsBob.length, 0);
    assert.equal(acceptedOffer.minimumOrderAmountsAlice.length, 0);
    assert.equal(acceptedOffer.minimumOrderTokens.length, 0);

    return;
  });

  it('should return tokens if the order minimum is not reached and offer is cancelled', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSale = ethers.utils.parseEther('20');
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: true,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 3 is Chunked Order with Minimum and No Expiration Time

    // Accept part of the offer without going over the minimum
    await dex.acceptOffer(0, tokensBob[1], smallestChunkSize);

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    const conversionnRate = amountAlice / amountBob[1];

    // Ensure everything adds up
    assert.equal(acceptedOffer.active, true);
    assert.equal(acceptedOffer.amountAlice.toString(), amountAlice.toString());
    assert.equal(
      acceptedOffer.amountRemaining.toString(),
      '47500000000000000000'
    );
    assert.equal(acceptedOffer.amountBob.length, 3);
    assert.equal(acceptedOffer.tokenAlice, testToken.address);
    assert.equal(acceptedOffer.tokenBob.length, 3);
    assert.equal(acceptedOffer.offerer, userAddress);
    assert.equal(acceptedOffer.payoutAddress, userAddress);
    assert.equal(acceptedOffer.deadline.toString(), '0');
    assert.equal(acceptedOffer.minimumOrderAddresses[0], userAddress);
    assert.equal(
      acceptedOffer.minimumOrderAmountsBob[0].toString(),
      smallestChunkSize.toString()
    );
    assert.equal(
      acceptedOffer.minimumOrderAmountsAlice[0].toString(),
      (smallestChunkSize * conversionnRate).toString()
    );
    assert.equal(acceptedOffer.minimumOrderTokens[0], tokensBob[1]);

    await dex.cancelOffer(0);

    let cancelledOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in is 0
    assert.equal(cancelledOffer.active, false);
    assert.equal(cancelledOffer.amountAlice.toString(), '0');
    assert.equal(cancelledOffer.amountBob.length, 0);
    assert.equal(
      cancelledOffer.tokenAlice,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(cancelledOffer.tokenBob.length, 0);
    assert.equal(
      cancelledOffer.offerer,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(
      cancelledOffer.payoutAddress,
      '0x0000000000000000000000000000000000000000'
    );

    return;
  });

  it('should return ether if the order minimum is not reached and offer is cancelled', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSale = ethers.utils.parseEther('5');
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: true,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 3 is Chunked Order with Minimum and No Expiration Time

    // Accept part of the offer without going over the minimum
    await dex.acceptOffer(0, tokensBob[2], smallestChunkSize, {
      value: smallestChunkSize,
    });

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    const conversionnRate = (amountAlice / amountBob[2]) * 20;

    await dex.cancelOffer(0);

    let cancelledOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in is 0
    assert.equal(cancelledOffer.active, false);
    assert.equal(cancelledOffer.amountAlice.toString(), '0');
    assert.equal(cancelledOffer.amountBob.length, 0);
    assert.equal(
      cancelledOffer.tokenAlice,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(cancelledOffer.tokenBob.length, 0);
    assert.equal(
      cancelledOffer.offerer,
      '0x0000000000000000000000000000000000000000'
    );
    assert.equal(
      cancelledOffer.payoutAddress,
      '0x0000000000000000000000000000000000000000'
    );

    return;
  });

  it.skip('should return tokens if the buyer cancels', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('1');
    const minimumSale = ethers.utils.parseEther('20');
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize,
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: true,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 3 is Chunked Order with Minimum and No Expiration Time

    // Accept part of the offer without going over the minimum
    await dex.acceptOffer(0, tokensBob[1], smallestChunkSize);

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    const conversionnRate = amountAlice / amountBob[1];

    // Ensure everything adds up
    assert.equal(acceptedOffer.active, true);
    assert.equal(acceptedOffer.amountAlice.toString(), amountAlice.toString());
    assert.equal(
      acceptedOffer.amountRemaining.toString(),
      '47500000000000000000'
    );
    assert.equal(acceptedOffer.amountBob.length, 3);
    assert.equal(acceptedOffer.tokenAlice, testToken.address);
    assert.equal(acceptedOffer.tokenBob.length, 3);
    assert.equal(acceptedOffer.offerer, userAddress);
    assert.equal(acceptedOffer.payoutAddress, userAddress);
    assert.equal(acceptedOffer.deadline.toString(), '0');
    assert.equal(acceptedOffer.minimumOrderAddresses[0], userAddress);
    assert.equal(
      acceptedOffer.minimumOrderAmountsBob[0].toString(),
      smallestChunkSize.toString()
    );
    assert.equal(
      acceptedOffer.minimumOrderAmountsAlice[0].toString(),
      (smallestChunkSize * conversionnRate).toString()
    );
    assert.equal(acceptedOffer.minimumOrderTokens[0], tokensBob[1]);

    await dex.cancelBid(0);

    let cancelledOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in is 0
    assert.equal(cancelledOffer.active, true);
    assert.equal(
      cancelledOffer.amountRemaining.toString(),
      '48500000000000000000'
    );
    assert.equal(cancelledOffer.minimumOrderAmountsAlice[0].toString(), '0');
    assert.equal(cancelledOffer.minimumOrderAmountsAlice.length, 1);
    assert.equal(
      cancelledOffer.minimumOrderAddresses[0],
      '0x0000000000000000000000000000000000000000'
    );

    return;
  });

  it.skip('should return ether if the buyer cancels', async function () {
    const feeAlice = 5;
    const feeBob = 5;
    const smallestChunkSize = ethers.utils.parseEther('0.1');
    const minimumSale = amountAlice;
    const deadline = 0;

    // Create the offer
    await dex.createOffer(
      testToken.address,
      tokensBob,
      amountAlice,
      amountBob,
      {
        feeAlice: feeAlice,
        feeBob: feeBob,
        smallestChunkSize: smallestChunkSize.toString(),
        deadline: deadline,
        cancelEnabled: true,
        modifyEnabled: false,
        minimumSize: minimumSale.toString(),
        holdTokens: true,
      }
    );

    // Ensure the offer is active
    let offer = await dex.getOffer(0);
    assert.equal(offer.active, true);

    // Ensure the offerType has been correctly calculated
    // 3 is Chunked Order with Minimum and No Expiration Time

    // Accept part of the offer without going over the minimum
    await dex.acceptOffer(0, tokensBob[2], smallestChunkSize, {
      value: smallestChunkSize,
    });

    // Get the offer again, this time after it's been cancelled.
    let acceptedOffer = await dex.getOffer(0);

    const conversionnRate = amountAlice / amountBob[2];

    await dex.cancelBid(0);

    let cancelledOffer = await dex.getOffer(0);

    // Ensure it's no longer active and the amount in is 0
    assert.equal(cancelledOffer.active, true);

    return;
  });

  describe('setMaxMinimumOrderTokensLength', () => {
    it('should allow owner to call', async () => {
      await dex.setMaxMinimumOrderTokensLength(100);
      expect(await dex.maxMinimumOrderTokensLength()).equal('100');
    });
    it('should fail if attempt to set the value to 0', async () => {
      await expect(dex.setMaxMinimumOrderTokensLength(0)).to.be.revertedWith(
        '404-MMOTLI'
      );
    });
    it('should fail if a non-owner try to call', async () => {
      let env = await prepareEnvironment();
      let { alice } = env;
      await expect(
        dex.connect(alice).setMaxMinimumOrderTokensLength(100)
      ).to.be.revertedWith('403');
    });
  });
});
