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

    uint256 minimumFee = 0;

    address commissionWallet;
    address commissionExchanger;

    constructor() {
		owner = msg.sender;
    }

	// onlyOwner modifier
	modifier onlyOwner {
		require(msg.sender == owner, "403");
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
		require(false, "NI");
	}
	function getOwner() public view returns (address)
	{
		require(false, "NI");
	}
	function changeOwner(address newOwner) onlyOwner public
	{
		require(false, "NI");
	}
	function getAllOffers() public view returns (MarsBaseCommon.MBOffer[] memory)
	{
		require(false, "NI");
	}
	function createOffer(
        address tokenAlice,
        address[] calldata tokenBob,
        uint256 amountAlice,
        uint256[] calldata amountBob,
        MarsBaseCommon.OfferParams calldata offerParameters
    ) public payable
	{
		require(false, "NI");
	}
	function cancelOffer(uint256 offerId) public
	{
		require(false, "NI");
	}
	function price(
        uint256 amountAlice,
        uint256 offerAmountAlice,
        uint256 offerAmountBob
    ) public pure returns (uint256)
	{
		require(false, "NI");
		return 0;
	}
	function acceptOffer(
        uint256 offerId,
        address tokenBob,
        uint256 amountBob
    ) public payable
	{
		require(false, "NI");
	}
	function changeOfferParams(
        uint256 offerId,
        address[] calldata tokenBob,
        uint256[] calldata amountBob,
        MarsBaseCommon.OfferParams calldata offerParameters
    ) public
	{
		require(false, "NI");
	}
	function cancelBid(uint256 offerId) public
	{
		require(false, "NI");
	}
	function cancelExpiredOffers() public payable
	{
		require(false, "NI");
	}
	function migrateContract() onlyOwner public payable
	{
		require(false, "NI");
	}
	function lockContract() onlyOwner public
	{
		require(false, "NI");
	}
	function cancelOffers(uint256 from, uint256 to) onlyOwner public payable
	{
		require(false, "NI");
	}
}
