// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./MarsBase.sol";
import "./MarsBaseCommon.sol";
import "./IMarsbaseExchange.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title MarsBaseExchange
/// @author dOTC Marsbase
/// @notice This contract contains the public facing elements of the marsbase exchange. 
contract MarsBaseExchange is IMarsbaseExchange
{
    address owner;

    uint256 nextOfferId = 0;
	uint256 activeOffersCount = 0;

    uint256 minimumFee = 0;

    address commissionWallet;
    address commissionExchanger;
	
    bool locked = false;

    mapping(uint256 => MarsBaseCommon.MBOffer) public offers;

    constructor() {
		owner = msg.sender;
    }

	// onlyOwner modifier
	modifier onlyOwner {
		require(msg.sender == owner, "403");
		_;
	}
	modifier unlocked {
		require(!locked, "409");
		_;
	}
	
	function setCommissionAddress(address wallet) onlyOwner public
	{
		commissionWallet = wallet;
	}
	function getCommissionAddress() public view returns (address)
	{
		return commissionWallet;
	}
	function setExchangerAddress(address exchangeContract) onlyOwner public
	{
		commissionExchanger = exchangeContract;
	}
	function getExchangerAddress() public view returns (address)
	{
		return commissionExchanger;
	}
	function setMinimumFee(uint256 _minimumFee) onlyOwner public
	{
		minimumFee = _minimumFee;
	}
	function getMinimumFee() public view returns (uint256)
	{
		return minimumFee;
	}
	function setNextOfferId(uint256 _nextOfferId) onlyOwner public
	{
		nextOfferId = _nextOfferId;
	}
	function getNextOfferId() public view returns (uint256)
	{
		return nextOfferId;
	}
	function getOffer(uint256 offerId) public view returns (MarsBaseCommon.MBOffer memory)
	{
		return offers[offerId];
	}
	function getOwner() public view returns (address)
	{
		return owner;
	}
	function changeOwner(address newOwner) onlyOwner public
	{
		owner = newOwner;
	}

	uint256 constant MAX_UINT256 = type(uint256).max;

	uint256 constant POW_2_128 = 2**128;
	uint256 constant POW_2_64 = 2**64;
	uint256 constant POW_2_32 = 2**32;
	uint256 constant POW_2_16 = 2**16;
	uint256 constant POW_2_8 = 2**8;
	uint256 constant POW_2_4 = 2**4;
	uint256 constant POW_2_2 = 2**2;
	uint256 constant POW_2_1 = 2**1;
	
	function log2(uint256 x) public pure returns (uint8 n)
	{
		if (x >= POW_2_128) { x >>= 128; n += 128; }
		if (x >= POW_2_64) { x >>= 64; n += 64; }
		if (x >= POW_2_32) { x >>= 32; n += 32; }
		if (x >= POW_2_16) { x >>= 16; n += 16; }
		if (x >= POW_2_8) { x >>= 8; n += 8; }
		if (x >= POW_2_4) { x >>= 4; n += 4; }
		if (x >= POW_2_2) { x >>= 2; n += 2; }
		if (x >= 2) { n += 1; }
	}

	/**
		Price calculation is approximate, but it's good enough for our purposes.
		We don't need the exact amount of tokens, we just need a close enough approximation.
	 */
	function price(
        uint256 amountAlice,
        uint256 offerAmountAlice,
        uint256 offerAmountBob
    ) public pure returns (uint256)
	{
		uint16 amountAliceLog2 = log2(amountAlice);
		uint16 offerAmountBobLog2 = log2(offerAmountBob);

		if ((amountAliceLog2 + offerAmountBobLog2) < 240) // TODO: check bounds for 255 instead of 240
		{
			return (amountAlice * offerAmountBob) / offerAmountAlice;

			// uint256 numerator = amountAlice * offerAmountBob;
			// uint256 finalPrice = numerator / offerAmountAlice;
			// return finalPrice;
		}

		// otherwise, just divide the bigger value
		if (amountAlice >= offerAmountBob)
		{
			// return (amountAlice * offerAmountBob) / offerAmountAlice;
			// return amountAlice * offerAmountBob / offerAmountAlice;
			// return amountAlice / offerAmountAlice * offerAmountBob;
			// return (amountAlice / offerAmountAlice) * offerAmountBob;
			return (amountAlice / offerAmountAlice) * offerAmountBob;
		}
		else
		{
			// return (amountAlice * offerAmountBob) / offerAmountAlice;
			// return amountAlice * offerAmountBob / offerAmountAlice;
			// return amountAlice * offerAmountBob / offerAmountAlice;
			// return amountAlice * (offerAmountBob / offerAmountAlice);
			return amountAlice * (offerAmountBob / offerAmountAlice);
		}
	}

	// max safe uint256 constant that can be calculated for 1e4 fee
	uint256 constant MAX_SAFE_TARGET_AMOUNT = MAX_UINT256 / (1e4);

	function afterFee(uint256 amountBeforeFee, uint256 feePercent) public pure returns (uint256 amountAfterFee, uint256 fee)
	{
		if (feePercent == 0)
			return (amountBeforeFee, 0);

		if (feePercent >= 1e4)
			return (0, amountBeforeFee);

		if (amountBeforeFee < MAX_SAFE_TARGET_AMOUNT)
			fee = (amountBeforeFee * feePercent) / 1e4;
		else
			fee = (amountBeforeFee / 1e4) * feePercent;

		amountAfterFee = amountBeforeFee - fee;
		return (amountAfterFee, fee);
	}

	// TODO: rename to `getAllActiveOffers`
	function getAllOffers() public view returns (MarsBaseCommon.MBOffer[] memory)
	{
		MarsBaseCommon.MBOffer[] memory offersArray = new MarsBaseCommon.MBOffer[](activeOffersCount);
		uint256 i = 0;
		for (uint256 offerId = 0; offerId < nextOfferId; offerId++)
		{
			if (offers[offerId].active)
			{
				offersArray[i] = offers[offerId];
				i++;
			}
		}
		return offersArray;
	}
	function getOfferType(uint256 amountAlice, MarsBaseCommon.OfferParams calldata offerParameters) public pure returns (MarsBaseCommon.OfferType)
	{
		if (offerParameters.minimumSize == 0)
		{
			if (offerParameters.deadline > 0
				&& offerParameters.smallestChunkSize > 0
				&& offerParameters.smallestChunkSize != amountAlice)
				return MarsBaseCommon.OfferType.LimitedTimeChunkedPurchase;
			
			if (offerParameters.smallestChunkSize > 0
				&& offerParameters.smallestChunkSize != amountAlice)
				return MarsBaseCommon.OfferType.ChunkedPurchase;
			
			if (offerParameters.deadline > 0)
				return MarsBaseCommon.OfferType.LimitedTime;
			
			return MarsBaseCommon.OfferType.FullPurchase;
		}
		if (offerParameters.deadline > 0 
			&& offerParameters.smallestChunkSize > 0
			&& offerParameters.smallestChunkSize != amountAlice
			&& offerParameters.holdTokens == true)
			return MarsBaseCommon.OfferType.LimitedTimeMinimumChunkedDeadlinePurchase;

		if (offerParameters.deadline > 0 && offerParameters.smallestChunkSize > 0 && offerParameters.smallestChunkSize != amountAlice)
			return MarsBaseCommon.OfferType.LimitedTimeMinimumChunkedPurchase;

		if (offerParameters.smallestChunkSize > 0 && offerParameters.smallestChunkSize != amountAlice)
			return MarsBaseCommon.OfferType.MinimumChunkedPurchase;

		if (offerParameters.deadline > 0)
			return MarsBaseCommon.OfferType.LimitedTimeMinimumPurchase;
		
		return MarsBaseCommon.OfferType.MinimumChunkedPurchase;
	}
	function createOffer(
        address tokenAlice,
        address[] calldata tokenBob,
        uint256 amountAlice,
        uint256[] calldata amountBob,
        MarsBaseCommon.OfferParams calldata offerParameters
    ) unlocked public payable
	{
		// require(!offerParameters.cancelEnabled, "NI - cancelEnabled");
		require(!offerParameters.modifyEnabled, "NI - modifyEnabled");
		require(!offerParameters.holdTokens, "NI - holdTokens");
		// require(offerParameters.feeAlice == 0, "NI - feeAlice");
		// require(offerParameters.feeBob == 0, "NI - feeBob");
		require(offerParameters.smallestChunkSize == 0, "NI - smallestChunkSize");
		require(offerParameters.deadline == 0, "NI - deadline");
		require(offerParameters.minimumSize == 0, "NI - minimumSize");
		
		require(tokenAlice != address(0), "NI - tokenAlice");
		require(amountAlice > 0, "NI - amountAlice");

		require(tokenBob.length > 0, "NI - tokenBob");
		require(amountBob.length == tokenBob.length, "400-BLMM"); // Bob Length MisMatch

		// create offer object
		uint256 offerId = nextOfferId++;
		activeOffersCount++;

		offers[offerId] = MarsBaseCommon.MBOffer(
			true,
			false,
			getOfferType(amountAlice, offerParameters),
			offerId,
			amountAlice,
			offerParameters.feeAlice,
			offerParameters.feeBob,
			offerParameters.smallestChunkSize,
			offerParameters.minimumSize,
			offerParameters.deadline,
			amountAlice,
			msg.sender,
			msg.sender,
			tokenAlice,
			[offerParameters.modifyEnabled, offerParameters.cancelEnabled, offerParameters.holdTokens],
			amountBob,
			new uint256[](0),
			new uint256[](0),
			new address[](0),
			new address[](0),
			tokenBob
		);

		// take tokens from alice
		require(IERC20(tokenAlice).transferFrom(msg.sender, address(this), amountAlice), "402");

		emit OfferCreated(offerId, msg.sender, block.timestamp, offers[offerId]);
	}
	function sendTokensAfterFeeFrom(
		address token,
		uint256 amount,
		address from,
		address to,
		uint256 feePercent
	) private returns (uint256 /* amountAfterFee */, uint256 /* fee */)
	{
		if (commissionWallet == address(0))
			feePercent = 0;

		(uint256 amountAfterFee, uint256 fee) = afterFee(amount, feePercent);

		// send tokens to receiver
		if (from == address(this))
			require(IERC20(token).transfer(to, amountAfterFee), "403-R1");
		else
			require(IERC20(token).transferFrom(from, to, amountAfterFee), "403-R2");

		if (fee > 0)
		{
			if (commissionWallet != address(0))
			{
				require(commissionExchanger == address(0), "NI - commissionExchanger");
			}

			// send fee to commission wallet
			if (from == address(this))
				require(IERC20(token).transfer(commissionWallet, fee), "403-C1");
			else
				require(IERC20(token).transferFrom(from, commissionWallet, fee), "403-C2");
		}
		return (amountAfterFee, fee);
	}
	function acceptOffer(
        uint256 offerId,
        address tokenBob,
        uint256 amountBob
    ) unlocked public payable
	{
		MarsBaseCommon.MBOffer memory offer = offers[offerId];
		require(offer.active, "404");

		// check that deadline has not passed
		if (offer.deadline > 0)
			require(offer.deadline < block.timestamp, "405-D"); // deadline has passed

		// check that tokenBob is accepted in the offer
		uint256 offerAmountBob = 0;
		{ // split to block to prevent solidity stack issues
			bool accepted = false;
			for (uint256 i = 0; i < offer.tokenBob.length; i++)
			{
				if (offer.tokenBob[i] == tokenBob)
				{
					accepted = true;
					offerAmountBob = offer.amountBob[i];
					break;
				}
			}
			require(accepted, "404-TBI"); // Token Bob is Incorrect
		}
		
		// calculate how much tokenAlice should be sent
		uint256 amountAlice = price(amountBob, offerAmountBob, offer.amountAlice);

		// check that amountAlice is not too high
		require(amountAlice <= offer.amountRemaining, "400-AAH"); // Amount Alice is too High

		// check that amountAlice is not too low
		require(amountAlice > 0, "400-AAL");

		// update offer
		offers[offerId].amountRemaining -= amountAlice;

		{ // split to block to prevent solidity stack issues
			// send tokens to participants or schedule for sending later
			// (now we only implement instant send)
			// send Bob tokens to Alice
			(uint256 bobSentToAlice, uint256 feeBobDeducted) = sendTokensAfterFeeFrom(tokenBob, amountBob, msg.sender, offer.offerer, offer.feeBob);
			// send Alice tokens to Bob
			(uint256 aliceSentToBob, uint256 feeAliceDeducted) = sendTokensAfterFeeFrom(offer.tokenAlice, amountAlice, address(this), msg.sender, offer.feeAlice);

			// emit event
			emit OfferAccepted(
				// uint256 offerId,
				offerId,
				// address sender,
				msg.sender,
				// uint256 blockTimestamp,
				block.timestamp,
				// uint256 amountAliceReceived,
				aliceSentToBob,
				// uint256 amountBobReceived,
				bobSentToAlice,
				// address tokenAddressAlice,
				offer.tokenAlice,
				// address tokenAddressBob,
				tokenBob,
				// MarsBaseCommon.OfferType offerType,
				offer.offerType,
				// uint256 feeAlice,
				feeAliceDeducted,
				// uint256 feeBob
				feeBobDeducted
			);
		}

		if (offers[offerId].amountRemaining == 0)
		{
			destroyOffer(offerId, MarsBaseCommon.OfferCloseReason.Success);
		}
	}
	function cancelOffer(uint256 offerId) unlocked public
	{
		MarsBaseCommon.MBOffer memory offer = offers[offerId];
		require(offer.active, "404");
		require(offer.capabilities[1], "400-CE");
		require(offer.offerer == msg.sender, "403");

		destroyOffer(offerId, MarsBaseCommon.OfferCloseReason.CancelledBySeller);
	}
	function destroyOffer(uint256 offerId, MarsBaseCommon.OfferCloseReason reason) private
	{
		MarsBaseCommon.MBOffer memory offer = offers[offerId];

		require(offer.active, "404");

		require(offer.minimumSize == 0, "NI - offer.minimumSize");

		// is this excessive for double-entry prevention?
		offers[offerId].active = false;

		// send remaining tokens to Alice
		if (offer.amountRemaining > 0)
			IERC20(offer.tokenAlice).transfer(offer.offerer, offer.amountRemaining);

		// TODO: return all locked Bob tokens to Bobs

		delete offers[offerId];
		
		emit OfferClosed(
			// uint256 offerId,
			offerId,
			// MarsBaseCommon.OfferCloseReason reason,
			reason,
			// uint256 blockTimestamp
			block.timestamp
		);
	}
	function changeOfferParams(
        uint256 offerId,
        address[] calldata tokenBob,
        uint256[] calldata amountBob,
        MarsBaseCommon.OfferParams calldata offerParameters
    ) unlocked public
	{
		require(false, "NI - changeOfferParams");
	}
	function cancelBid(uint256 offerId) unlocked public
	{
		require(false, "NI - cancelBid");
	}
	function cancelExpiredOffers() public payable
	{
		require(false, "NI - cancelExpiredOffers");
	}
	function migrateContract() onlyOwner public payable
	{
		require(false, "NI - migrateContract");
	}
	function lockContract() onlyOwner public
	{
		require(false, "NI - lockContract");
	}
	function cancelOffers(uint256 from, uint256 to) onlyOwner public payable
	{
		require(false, "NI - cancelOffers");
	}
}
