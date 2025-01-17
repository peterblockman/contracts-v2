// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import './MarsBaseCommon.sol';
import './IMarsbaseExchange.sol';

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

using SafeERC20 for IERC20;

// import "hardhat/console.sol";

/// @title MarsBaseExchange
/// @author dOTC Marsbase
/// @notice This contract contains the public facing elements of the marsbase exchange.
//is IMarsbaseExchange
contract MarsBaseExchange {
    address owner;

    uint256 nextOfferId = 0;
    uint256 activeOffersCount = 0;

    uint256 public constant SCALE = 1e3;
    uint256 public maximumFee = 10; // 1%
    uint256 minimumFee = 0;

    address commissionWallet;
    address commissionExchanger;

    bool locked = false;

    uint256 public maxMinimumOrderTokensLength = 50;

    mapping(uint256 => MarsBaseCommon.MBOffer) public offers;

    constructor(uint256 startOfferId) {
        owner = msg.sender;
        commissionWallet = msg.sender;
        nextOfferId = startOfferId;
    }

    // onlyOwner modifier
    modifier onlyOwner() {
        require(msg.sender == owner, '403');
        _;
    }
    modifier unlocked() {
        require(!locked, '409');
        _;
    }

    modifier validFee(uint256 fee) {
        require(fee <= SCALE, '400-IFS');
        _;
    }

    function setCommissionAddress(address wallet) public onlyOwner {
        commissionWallet = wallet;
    }

    function getCommissionAddress() public view returns (address) {
        return commissionWallet;
    }

    function setExchangerAddress(address exchangeContract) public onlyOwner {
        commissionExchanger = exchangeContract;
    }

    function getExchangerAddress() public view returns (address) {
        return commissionExchanger;
    }

    function setMinimumFee(uint256 _minimumFee) public onlyOwner validFee(_minimumFee) {
        minimumFee = _minimumFee;
    }

    function setMaximumFee(uint256 _maximumFee) public onlyOwner validFee(_maximumFee) {
        maximumFee = _maximumFee;
    }

    function getMinimumFee() public view returns (uint256) {
        return minimumFee;
    }

    function setNextOfferId(uint256 _nextOfferId) public onlyOwner {
        require(_nextOfferId > nextOfferId, '400-OII');
        nextOfferId = _nextOfferId;
    }

    function getNextOfferId() public view returns (uint256) {
        return nextOfferId;
    }

    function getOffer(uint256 offerId) public view returns (MarsBaseCommon.MBOffer memory) {
        return offers[offerId];
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    function setMaxMinimumOrderTokensLength(uint256 _maxMinimumOrderTokensLength) public onlyOwner {
        require(_maxMinimumOrderTokensLength > 0, '404-MMOTLI'); // Maximum MinimumOrderTokens Length Invalid
        maxMinimumOrderTokensLength = _maxMinimumOrderTokensLength;
    }

    uint256 constant MAX_UINT256 = type(uint256).max;

    uint256 constant POW_2_128 = 2 ** 128;
    uint256 constant POW_2_64 = 2 ** 64;
    uint256 constant POW_2_32 = 2 ** 32;
    uint256 constant POW_2_16 = 2 ** 16;
    uint256 constant POW_2_8 = 2 ** 8;
    uint256 constant POW_2_4 = 2 ** 4;
    uint256 constant POW_2_2 = 2 ** 2;
    uint256 constant POW_2_1 = 2 ** 1;

    function log2(uint256 x) public pure returns (uint8 n) {
        if (x >= POW_2_128) {
            x >>= 128;
            n += 128;
        }
        if (x >= POW_2_64) {
            x >>= 64;
            n += 64;
        }
        if (x >= POW_2_32) {
            x >>= 32;
            n += 32;
        }
        if (x >= POW_2_16) {
            x >>= 16;
            n += 16;
        }
        if (x >= POW_2_8) {
            x >>= 8;
            n += 8;
        }
        if (x >= POW_2_4) {
            x >>= 4;
            n += 4;
        }
        if (x >= POW_2_2) {
            x >>= 2;
            n += 2;
        }
        if (x >= 2) {
            n += 1;
        }
    }

    /**
		Price calculation is approximate, but it's good enough for our purposes.
		We don't need the exact amount of tokens, we just need a close enough approximation.
	*/
    function price(
        uint256 amountAlice,
        uint256 offerAmountAlice,
        uint256 offerAmountBob
    ) public pure returns (uint256) {
        uint16 amountAliceLog2 = log2(amountAlice);
        uint16 offerAmountBobLog2 = log2(offerAmountBob);

        if (
            (amountAliceLog2 + offerAmountBobLog2) < 240
        ) // TODO: check bounds for 255 instead of 240
        {
            return (amountAlice * offerAmountBob) / offerAmountAlice;

            // uint256 numerator = amountAlice * offerAmountBob;
            // uint256 finalPrice = numerator / offerAmountAlice;
            // return finalPrice;
        }

        // otherwise, just divide the bigger value
        if (amountAlice >= offerAmountBob) {
            // return (amountAlice * offerAmountBob) / offerAmountAlice;
            // return amountAlice * offerAmountBob / offerAmountAlice;
            // return amountAlice / offerAmountAlice * offerAmountBob;
            // return (amountAlice / offerAmountAlice) * offerAmountBob;
            return (amountAlice / offerAmountAlice) * offerAmountBob;
        } else {
            // return (amountAlice * offerAmountBob) / offerAmountAlice;
            // return amountAlice * offerAmountBob / offerAmountAlice;
            // return amountAlice * offerAmountBob / offerAmountAlice;
            // return amountAlice * (offerAmountBob / offerAmountAlice);
            return amountAlice * (offerAmountBob / offerAmountAlice);
        }
    }

    // max safe uint256 constant that can be calculated for 1e4 fee
    uint256 constant MAX_SAFE_TARGET_AMOUNT = MAX_UINT256 / (1e4);

    function afterFee(
        uint256 amountBeforeFee,
        uint256 feePercent
    ) public pure returns (uint256 amountAfterFee, uint256 fee) {
        return _afterFee(amountBeforeFee, feePercent, SCALE, MAX_SAFE_TARGET_AMOUNT);
    }

    function _afterFee(
        uint256 amountBeforeFee,
        uint256 feePercent,
        uint256 scale,
        uint256 safeAmount
    ) public pure returns (uint256 amountAfterFee, uint256 fee) {
        if (feePercent == 0) return (amountBeforeFee, 0);

        if (feePercent >= scale) return (0, amountBeforeFee);

        if (amountBeforeFee < safeAmount) fee = (amountBeforeFee * feePercent) / scale;
        else fee = (amountBeforeFee / scale) * feePercent;

        amountAfterFee = amountBeforeFee - fee;
        return (amountAfterFee, fee);
    }

    // TODO: rename to `getAllActiveOffers`
    function getAllOffers() public view returns (MarsBaseCommon.MBOffer[] memory) {
        MarsBaseCommon.MBOffer[] memory offersArray = new MarsBaseCommon.MBOffer[](
            activeOffersCount
        );
        uint256 i = 0;
        for (uint256 offerId = 0; offerId < nextOfferId; offerId++) {
            if (offers[offerId].active) {
                offersArray[i] = offers[offerId];
                i++;
            }
        }
        return offersArray;
    }

    function limitMinimumSize9999(
        uint256 minimumSize,
        uint256 amountAlice
    ) public pure returns (uint256) {
        if (minimumSize == 0) return minimumSize;

        (uint256 amountAfterFee, ) = _afterFee(amountAlice, 1, 1e4, MAX_UINT256 / 1e5);
        if (minimumSize > amountAfterFee) {
            minimumSize = amountAfterFee;
        }
        return minimumSize;
    }

    function createOffer(
        address tokenAlice,
        address[] calldata tokenBob,
        uint256 amountAlice,
        uint256[] calldata amountBob,
        MarsBaseCommon.OfferParams calldata offerParameters
    ) public payable unlocked {
        // require(!offerParameters.cancelEnabled, "NI - cancelEnabled");
        require(!offerParameters.modifyEnabled, 'NI-ME'); // Modify Enabled
        // require(!offerParameters.holdTokens, "NI - holdTokens");
        // require(offerParameters.feeAlice == 0, "NI - feeAlice");
        // require(offerParameters.feeBob == 0, "NI - feeBob");
        // require(offerParameters.smallestChunkSize == 0, "NI - smallestChunkSize");
        // require(offerParameters.deadline == 0, "NI - deadline");
        // require(offerParameters.minimumSize == 0, "NI - minimumSize");
        require(
            offerParameters.feeAlice + offerParameters.feeBob >= minimumFee &&
                offerParameters.feeAlice + offerParameters.feeBob <= maximumFee,
            '400-FI'
        );

        if (offerParameters.deadline > 0)
            require(offerParameters.deadline > block.timestamp, '405-OD');

        // require(tokenAlice != address(0), "NI - tokenAlice ETH");
        require(amountAlice > 0, '400-AAL');

        require(tokenBob.length > 0, '400-BE');
        require(amountBob.length == tokenBob.length, '400-BLMM'); // Bob Length MisMatch

        // for (uint256 i = 0; i < tokenBob.length; i++)
        // {
        // 	require(tokenBob[i] != address(0), "NI - tokenBob ETH");
        // }
        // take tokens from alice
        if (tokenAlice == address(0)) require(amountAlice == msg.value, '402-E');
        else IERC20(tokenAlice).safeTransferFrom(msg.sender, address(this), amountAlice);

        // create offer object
        uint256 offerId = nextOfferId++;
        activeOffersCount++;

        offers[offerId] = MarsBaseCommon.MBOffer(
            true,
            false,
            MarsBaseCommon.OfferType.MinimumChunkedPurchase,
            offerId,
            amountAlice,
            offerParameters.feeAlice,
            offerParameters.feeBob,
            limitMinimumSize9999(offerParameters.smallestChunkSize, amountAlice),
            limitMinimumSize9999(offerParameters.minimumSize, amountAlice),
            offerParameters.deadline,
            amountAlice,
            msg.sender,
            msg.sender,
            tokenAlice,
            [
                offerParameters.modifyEnabled,
                offerParameters.cancelEnabled,
                offerParameters.holdTokens
            ],
            amountBob,
            new uint256[](0),
            new uint256[](0),
            new address[](0),
            new address[](0),
            tokenBob
        );

        // console.log(amountAlice);

        emit MarsBaseCommon.OfferCreated(offerId, msg.sender, block.timestamp, offers[offerId]);
    }

    function sendTokensAfterFeeFrom(
        address token,
        uint256 amount,
        address from,
        address to,
        uint256 feePercent
    ) private returns (uint256 /* amountAfterFee */, uint256 /* fee */) {
        if (commissionWallet == address(0)) feePercent = 0;

        (uint256 amountAfterFee, uint256 fee) = afterFee(amount, feePercent);

        // send tokens to receiver
        if (from == address(this)) IERC20(token).safeTransfer(to, amountAfterFee);
        else IERC20(token).safeTransferFrom(from, to, amountAfterFee);

        if (fee > 0) {
            require(commissionExchanger == address(0), 'NI - commissionExchanger');

            // send fee to commission wallet
            if (from == address(this)) IERC20(token).safeTransfer(commissionWallet, fee);
            else IERC20(token).safeTransferFrom(from, commissionWallet, fee);
        }
        return (amountAfterFee, fee);
    }

    function _sendEthAfterFee(
        uint256 amount,
        address to,
        uint256 feePercent
    ) private returns (uint256 /* amountAfterFee */, uint256 /* fee */) {
        if (commissionWallet == address(0)) feePercent = 0;

        (uint256 amountAfterFee, uint256 fee) = afterFee(amount, feePercent);

        (bool success, ) = to.call{value: amountAfterFee, gas: 30000}('');
        require(success, '404-C1');

        if (fee > 0) {
            require(commissionExchanger == address(0), 'NI - commissionExchanger');

            // send fee to commission wallet
            (bool success2, ) = commissionWallet.call{value: fee, gas: 30000}('');
            require(success2, '404-C2');
        }
        return (amountAfterFee, fee);
    }

    function acceptOffer(
        uint256 offerId,
        address tokenBob,
        uint256 amountBob
    ) public payable unlocked {
        require(amountBob > 0, '400-ABL');
        MarsBaseCommon.MBOffer memory offer = offers[offerId];
        require(offer.active, '404');

        // check that deadline has not passed
        if (offer.deadline > 0) require(offer.deadline >= block.timestamp, '405-D'); // deadline has passed

        // check that tokenBob is accepted in the offer
        uint256 offerAmountBob = 0;
        {
            // split to block to prevent solidity stack issues
            bool accepted = false;
            for (uint256 i = 0; i < offer.tokenBob.length; i++) {
                if (offer.tokenBob[i] == tokenBob) {
                    accepted = true;
                    offerAmountBob = offer.amountBob[i];
                    break;
                }
            }
            require(accepted, '404-TBI'); // Token Bob is Incorrect
        }

        // calculate how much tokenAlice should be sent
        uint256 amountAlice = price(amountBob, offerAmountBob, offer.amountAlice);

        // check that amountAlice is not too low (if smallestChunkSize is 0 it's also okay)
        require(amountAlice >= min(offer.smallestChunkSize, offer.amountRemaining), '400-AAL');

        // check that amountAlice is not too high
        require(amountAlice <= offer.amountRemaining, '400-AAH'); // Amount Alice is too High
        // we don't throw here so it's possible to "overspend"
        // e.g.:
        // swap 100 $ALICE to 33 $BOB
        // 1 $BOB = 3.333 $ALICE (rounded to 3 due to integer arithmetics)
        // minbid is 11 $BOB
        // Bob buys 33 $ALICE for 11 $BOB (67 $ALICE remaining)
        // Charlie buys 33 $ALICE for 11 $BOB (34 $ALICE remaining)
        // David wants to buy all 34 $ALICE, but:
        // if he tries to send 11 $BOB he will receive only 33 $ALICE
        // if he tries to send 12 $BOB, amountAlice will be 36 $ALICE and tx will revert
        // so we need to let David send a little more $BOB than the limit
        // if (amountAlice > offer.amountRemaining)
        // 	amountAlice = offer.amountRemaining;
        // unfortunately, to prevent front-running we need to make sure
        // that the bidder really expects to get less tokens
        // TODO: we can enable this functionality by providing expected amountAlice into this method (dex-style)

        // update offer
        offers[offerId].amountRemaining -= amountAlice;

        offer = offers[offerId];

        // send tokens to participants or schedule for sending later
        bool holdTokens = offer.capabilities[2];

        if (!holdTokens && minimumCovered(offer)) {
            // console.log("instant");
            // console.log(amountBob);
            // console.log(amountAlice);
            _swapAllHeldTokens(offers[offerId]);
            _swapInstantTokens(offer, tokenBob, amountBob, amountAlice);
        } else {
            // console.log("hold");
            // console.log(amountBob);
            // console.log(amountAlice);
            _scheduleTokenSwap(offer, tokenBob, amountBob, amountAlice, msg.sender);
        }

        offer = offers[offerId];

        if (offer.amountRemaining <= (offer.amountAlice / 10000)) {
            _swapAllHeldTokens(offers[offerId]);
            _destroyOffer(offerId, MarsBaseCommon.OfferCloseReason.Success);
        }
    }

    function max(uint256 a, uint256 b) public pure returns (uint256) {
        return a >= b ? a : b;
    }

    function min(uint256 a, uint256 b) public pure returns (uint256) {
        return a >= b ? b : a;
    }

    function minimumCovered(MarsBaseCommon.MBOffer memory offer) public pure returns (bool result) {
        uint256 amountSold = offer.amountAlice - offer.amountRemaining;
        result = amountSold >= offer.minimumSize;
    }

    function isEligibleToPayout(
        MarsBaseCommon.MBOffer memory offer
    ) public pure returns (bool eligible) {
        return minimumCovered(offer);
    }

    function cancelOffer(uint256 offerId) public payable unlocked {
        MarsBaseCommon.MBOffer memory offer = offers[offerId];
        require(offer.active, '404');
        require(offer.capabilities[1], '400-CE');
        require(offer.offerer == msg.sender, '403');

        if (isEligibleToPayout(offer) && offer.minimumOrderTokens.length > 0)
            _swapAllHeldTokens(offer);

        _destroyOffer(offerId, MarsBaseCommon.OfferCloseReason.CancelledBySeller);
    }

    function _emitOfferAcceptedForScheduledSwap(
        MarsBaseCommon.MBOffer memory offer,
        uint256 i
    ) private {
        (uint256 aliceSentToBob, uint256 feeAliceDeducted) = afterFee(
            offer.minimumOrderAmountsAlice[i],
            offer.feeAlice
        );
        (uint256 bobSentToAlice, uint256 feeBobDeducted) = afterFee(
            offer.minimumOrderAmountsBob[i],
            offer.feeBob
        );

        // emit event
        emit MarsBaseCommon.OfferAccepted(
            // uint256 offerId,
            offer.offerId,
            // address sender,
            offer.minimumOrderAddresses[i],
            // uint256 blockTimestamp,
            block.timestamp,
            // uint256 amountAliceReceived,
            aliceSentToBob,
            // uint256 amountBobReceived,
            bobSentToAlice,
            // address tokenAddressAlice,
            offer.tokenAlice,
            // address tokenAddressBob,
            offer.minimumOrderTokens[i],
            // MarsBaseCommon.OfferType offerType,
            offer.offerType,
            // uint256 feeAlice,
            feeAliceDeducted,
            // uint256 feeBob
            feeBobDeducted
        );
    }

    function _scheduleTokenSwap(
        MarsBaseCommon.MBOffer memory offer,
        address tokenBob,
        uint256 amountBob,
        uint256 amountAlice,
        address bob
    ) private {
        uint256 index = offers[offer.offerId].minimumOrderAddresses.length;

        // console.log("_scheduleTokenSwap");
        // console.log(amountBob);

        if (tokenBob == address(0)) {
            require(msg.value == amountBob, '403-C1');
        } else {
            IERC20(tokenBob).safeTransferFrom(bob, address(this), amountBob);
        }

        require(
            offers[offer.offerId].minimumOrderTokens.length < maxMinimumOrderTokensLength,
            '406-MAXMOTLE'
        ); // Maximum minimumOrderTokens's length exceeded.

        offers[offer.offerId].minimumOrderAmountsAlice.push(amountAlice);
        offers[offer.offerId].minimumOrderAmountsBob.push(amountBob);
        offers[offer.offerId].minimumOrderAddresses.push(bob);
        offers[offer.offerId].minimumOrderTokens.push(tokenBob);

        _emitOfferAcceptedForScheduledSwap(offers[offer.offerId], index);
    }

    function _swapInstantTokens(
        MarsBaseCommon.MBOffer memory offer,
        address tokenBob,
        uint256 amountBob,
        uint256 amountAlice
    ) private {
        // send Bob tokens to Alice
        uint256 bobSentToAlice;
        uint256 feeBobDeducted;
        if (tokenBob == address(0)) {
            (bobSentToAlice, feeBobDeducted) = _sendEthAfterFee(
                amountBob,
                offer.offerer,
                offer.feeBob
            );
        } else {
            (bobSentToAlice, feeBobDeducted) = sendTokensAfterFeeFrom(
                // address token,
                tokenBob,
                // uint256 amount,
                amountBob,
                // address from,
                msg.sender,
                // address to,
                offer.offerer,
                // uint256 feePercent
                offer.feeBob
            );
        }

        // send Alice tokens to Bob
        uint256 aliceSentToBob;
        uint256 feeAliceDeducted;
        if (offer.tokenAlice == address(0)) {
            (aliceSentToBob, feeAliceDeducted) = _sendEthAfterFee(
                amountAlice,
                msg.sender,
                offer.feeAlice
            );
        } else {
            (aliceSentToBob, feeAliceDeducted) = sendTokensAfterFeeFrom(
                // address token,
                offer.tokenAlice,
                // uint256 amount,
                amountAlice,
                // address from,
                address(this),
                // address to,
                msg.sender,
                // uint256 feePercent
                offer.feeAlice
            );
        }

        // emit event
        emit MarsBaseCommon.OfferAccepted(
            // uint256 offerId,
            offer.offerId,
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

    function _swapAllHeldTokens(MarsBaseCommon.MBOffer memory offer) private {
        uint256 offerId = offer.offerId;
        uint256 length = offer.minimumOrderTokens.length;

        offers[offerId].minimumOrderTokens = new address[](0);
        offers[offerId].minimumOrderAmountsAlice = new uint256[](0);
        // trade all remaining tokens
        for (uint256 i = 0; i < length; i++) {
            // address tokenBob = offer.minimumOrderTokens[i];
            // uint256 amountBob = offer.minimumOrderAmountsBob[i];
            // uint256 amountAlice = offer.minimumOrderAmountsAlice[i];
            _swapHeldTokens(offer, i);
        }
        // drop used arrays
        offers[offerId].minimumOrderAmountsBob = new uint256[](0);
        offers[offerId].minimumOrderAddresses = new address[](0);
    }

    function _swapHeldTokens(MarsBaseCommon.MBOffer memory offer, uint256 i) private {
        // send Bob tokens to Alice
        if (offer.minimumOrderTokens[i] == address(0)) {
            _sendEthAfterFee(offer.minimumOrderAmountsBob[i], offer.offerer, offer.feeBob);
        } else {
            sendTokensAfterFeeFrom(
                // address token,
                offer.minimumOrderTokens[i],
                // uint256 amount,
                offer.minimumOrderAmountsBob[i],
                // address from,
                address(this),
                // address to,
                offer.offerer,
                // uint256 feePercent
                offer.feeBob
            );
        }

        // send Alice tokens to Bob
        if (offer.tokenAlice == address(0)) {
            _sendEthAfterFee(
                offer.minimumOrderAmountsAlice[i],
                offer.minimumOrderAddresses[i],
                offer.feeAlice
            );
        } else {
            sendTokensAfterFeeFrom(
                // address token,
                offer.tokenAlice,
                // uint256 amount,
                offer.minimumOrderAmountsAlice[i],
                // address from,
                address(this),
                // address to,
                offer.minimumOrderAddresses[i],
                // uint256 feePercent
                offer.feeAlice
            );
        }

        // do not emit event (it was emit before)

        // // emit event
        // emit OfferAccepted(
        // 	// uint256 offerId,
        // 	offer.offerId,
        // 	// address sender,
        // 	msg.sender,
        // 	// uint256 blockTimestamp,
        // 	block.timestamp,
        // 	// uint256 amountAliceReceived,
        // 	aliceSentToBob,
        // 	// uint256 amountBobReceived,
        // 	bobSentToAlice,
        // 	// address tokenAddressAlice,
        // 	offer.tokenAlice,
        // 	// address tokenAddressBob,
        // 	offer.minimumOrderTokens[i],
        // 	// MarsBaseCommon.OfferType offerType,
        // 	offer.offerType,
        // 	// uint256 feeAlice,
        // 	feeAliceDeducted,
        // 	// uint256 feeBob
        // 	feeBobDeducted
        // );
    }

    function closeExpiredOffer(uint256 offerId) public unlocked {
        MarsBaseCommon.MBOffer memory offer = offers[offerId];
        require(offer.active, '404');
        // require offer to be expired
        require((offer.deadline > 0) && (offer.deadline < block.timestamp), '400-NE'); // Not Expired

        // if minimum covered
        // uint256 amountSold = offer.amountAlice - offer.amountRemaining;
        // bool minimumCovered = amountSold >= offer.minimumSize;
        // bool minimumCovered = (offer.amountAlice - offer.amountRemaining) >= offer.minimumSize;
        if ((offer.amountAlice - offer.amountRemaining) < offer.minimumSize) {
            _destroyOffer(offerId, MarsBaseCommon.OfferCloseReason.DeadlinePassed);
            return;
        }
        // if any tokens are still held in the offer
        if (offer.minimumOrderTokens.length > 0) {
            _swapAllHeldTokens(offer);
        }

        _destroyOffer(offerId, MarsBaseCommon.OfferCloseReason.Success);
    }

    function _destroyOffer(uint256 offerId, MarsBaseCommon.OfferCloseReason reason) private {
        MarsBaseCommon.MBOffer memory offer = offers[offerId];

        require(offer.active, '404');

        // require(offer.minimumSize == 0, "NI - offer.minimumSize");

        // is this excessive for double-entry prevention?
        offers[offerId].active = false;

        // send remaining tokens to Alice
        if (offer.amountRemaining > 0) {
            if (offer.tokenAlice == address(0)) {
                _sendEthAfterFee(offer.amountRemaining, offer.offerer, 0);
            } else IERC20(offer.tokenAlice).safeTransfer(offer.offerer, offer.amountRemaining);
        }

        // if any tokens are still held in the offer
        if (offer.minimumOrderTokens.length > 0) {
            // revert all tokens to their owners
            for (uint256 i = 0; i < offer.minimumOrderTokens.length; i++) {
                if (offer.minimumOrderTokens[i] == address(0))
                    _sendEthAfterFee(
                        offer.minimumOrderAmountsBob[i],
                        offer.minimumOrderAddresses[i],
                        0
                    );
                else
                    IERC20(offer.minimumOrderTokens[i]).safeTransfer(
                        offer.minimumOrderAddresses[i],
                        offer.minimumOrderAmountsBob[i]
                    );

                if (offer.tokenAlice == address(0))
                    _sendEthAfterFee(offer.minimumOrderAmountsAlice[i], offer.offerer, 0);
                else
                    IERC20(offer.tokenAlice).safeTransfer(
                        offer.offerer,
                        offer.minimumOrderAmountsAlice[i]
                    );
            }
        }

        delete offers[offerId];
        activeOffersCount--;

        emit MarsBaseCommon.OfferClosed(
            // uint256 offerId,
            offerId,
            // MarsBaseCommon.OfferCloseReason reason,
            reason,
            // uint256 blockTimestamp
            block.timestamp
        );
    }

    // function changeOfferParams(
    //     uint256 offerId,
    //     address[] calldata tokenBob,
    //     uint256[] calldata amountBob,
    //     MarsBaseCommon.OfferParams calldata offerParameters
    // ) unlocked public
    // {
    // 	require(false, "NI - changeOfferParams");
    // }
    // function cancelBid(uint256 offerId) unlocked public
    // {
    // 	require(false, "NI - cancelBid");
    // }
    // function cancelExpiredOffers() public payable
    // {
    // 	require(false, "NI - cancelExpiredOffers");
    // }
    function migrateContract() public payable onlyOwner unlocked {
        lockContract();
        cancelOffers(0, nextOfferId);
    }

    function lockContract() public onlyOwner {
        locked = true;
    }

    function cancelOffers(uint256 from, uint256 to) public payable onlyOwner {
        for (uint256 i = from; i < to; i++) {
            MarsBaseCommon.MBOffer memory offer = offers[i];
            if (offer.active) {
                if (isEligibleToPayout(offer)) _swapAllHeldTokens(offer);

                _destroyOffer(i, MarsBaseCommon.OfferCloseReason.CancelledBySeller);
            }
        }
    }

    receive() external payable {}
}
