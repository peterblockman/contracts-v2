const assert = require ('assert/strict')
const BigNumber = require ('bignumber.js')
const { expect } = require ("chai")
const { ethers } = require ("hardhat")
const { createOfferTokenToken, sensibleOfferDefaults } = require('../create-offer')
const { checkEvent, checkEventExists, checkEventDoesntExist } = require('../events')
const { mintAll, approveMany, expectBalances } = require('../token-utils')
const { prepareEnvironment, ZERO, getOfferIdFromTx, getOfferDataFromTx, skipTime, skipTimeTo, getLastBlockTime } = require("../utils")

describe("missing/eth", () =>
{
	it("should create an offer with eth as tokenAlice")
	it("should create an offer with eth as one of tokenBob")
	it("should create a bid with eth (instant exchange)")
	it("should create a bid with eth (hold tokens)")
	it("should not create an offer with eth if not enough eth")
	it("should not create a bid with eth if not enough eth")
	it("should cancel an offer with eth tokenAlice")
	it("should cancel an offer with eth held")
	it("should deduct a fee from the eth offer")
	it("should deduct a fee from the eth bid")
})