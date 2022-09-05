/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  MarsbaseBestBid,
  MarsbaseBestBidInterface,
} from "../../../contracts/MarsbaseBestBid.sol/MarsbaseBestBid";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startOfferId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "aliceAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "aliceReceivedTotal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "aliceFeeTotal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bobReceivedTotal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bobFeeTotal",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "active",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "aliceAddress",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "tokenAlice",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amountAlice",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "tokensBob",
                type: "address[]",
              },
              {
                internalType: "uint256",
                name: "feeAlice",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "feeBob",
                type: "uint256",
              },
            ],
            internalType: "struct IMarsbaseBestBid.BBOfferParams",
            name: "params",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "totalBidsCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activeBidsCount",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct IMarsbaseBestBid.BBOffer",
        name: "offer",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "offerId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bidIdx",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "bobAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenBob",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountBob",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct IMarsbaseBestBid.BBBid",
        name: "bid",
        type: "tuple",
      },
    ],
    name: "BidAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bobAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenBob",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum IMarsbaseBestBid.BidCancelReason",
        name: "reason",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bidIdx",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "bidId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "offerId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bidIdx",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "bobAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenBob",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountBob",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct IMarsbaseBestBid.BBBid",
        name: "bid",
        type: "tuple",
      },
    ],
    name: "BidCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bobAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenBob",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bidIdx",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "bidId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "offerId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bidIdx",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "bobAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenBob",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountBob",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct IMarsbaseBestBid.BBBid",
        name: "bid",
        type: "tuple",
      },
    ],
    name: "BidCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "aliceAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "enum IMarsbaseBestBid.OfferCloseReason",
        name: "reason",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "active",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "aliceAddress",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "tokenAlice",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amountAlice",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "tokensBob",
                type: "address[]",
              },
              {
                internalType: "uint256",
                name: "feeAlice",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "feeBob",
                type: "uint256",
              },
            ],
            internalType: "struct IMarsbaseBestBid.BBOfferParams",
            name: "params",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "totalBidsCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activeBidsCount",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct IMarsbaseBestBid.BBOffer",
        name: "offer",
        type: "tuple",
      },
    ],
    name: "OfferClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "aliceAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAlice",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "tokenAlice",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountAlice",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "tokensBob",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "feeAlice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feeBob",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct IMarsbaseBestBid.BBOfferParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "OfferCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountBeforeFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feePercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "scale",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "safeAmount",
        type: "uint256",
      },
    ],
    name: "_afterFee",
    outputs: [
      {
        internalType: "uint256",
        name: "amountAfterFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bidIdx",
        type: "uint256",
      },
    ],
    name: "acceptBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "activeOffersCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountBeforeFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feePercent",
        type: "uint256",
      },
    ],
    name: "afterFee",
    outputs: [
      {
        internalType: "uint256",
        name: "amountAfterFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bidIdx",
        type: "uint256",
      },
    ],
    name: "cancelBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
    ],
    name: "cancelBids",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "cancelOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
    ],
    name: "cancelOffers",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "commissionWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenBob",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountBob",
        type: "uint256",
      },
    ],
    name: "createBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenAlice",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountAlice",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "tokensBob",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "feeAlice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feeBob",
            type: "uint256",
          },
        ],
        internalType: "struct IMarsbaseBestBid.BBOfferParams",
        name: "offer",
        type: "tuple",
      },
    ],
    name: "createOffer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "getActiveBidsForOffer",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "offerId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bidIdx",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "bobAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenBob",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountBob",
            type: "uint256",
          },
        ],
        internalType: "struct IMarsbaseBestBid.BBBid[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveOffers",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "active",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "aliceAddress",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "tokenAlice",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amountAlice",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "tokensBob",
                type: "address[]",
              },
              {
                internalType: "uint256",
                name: "feeAlice",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "feeBob",
                type: "uint256",
              },
            ],
            internalType: "struct IMarsbaseBestBid.BBOfferParams",
            name: "params",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "totalBidsCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activeBidsCount",
            type: "uint256",
          },
        ],
        internalType: "struct IMarsbaseBestBid.BBOffer[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bidIdx",
        type: "uint256",
      },
    ],
    name: "getBidId",
    outputs: [
      {
        internalType: "bytes32",
        name: "bidId",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "getOffer",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "active",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "aliceAddress",
            type: "address",
          },
          {
            components: [
              {
                internalType: "address",
                name: "tokenAlice",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amountAlice",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "tokensBob",
                type: "address[]",
              },
              {
                internalType: "uint256",
                name: "feeAlice",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "feeBob",
                type: "uint256",
              },
            ],
            internalType: "struct IMarsbaseBestBid.BBOfferParams",
            name: "params",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "totalBidsCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activeBidsCount",
            type: "uint256",
          },
        ],
        internalType: "struct IMarsbaseBestBid.BBOffer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "locked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOfferId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "offerBids",
    outputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bidIdx",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "bobAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenBob",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountBob",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "offers",
    outputs: [
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "aliceAddress",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "tokenAlice",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountAlice",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "tokensBob",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "feeAlice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feeBob",
            type: "uint256",
          },
        ],
        internalType: "struct IMarsbaseBestBid.BBOfferParams",
        name: "params",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "totalBidsCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "activeBidsCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
    ],
    name: "setCommissionAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minimumFee",
        type: "uint256",
      },
    ],
    name: "setMinimumFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class MarsbaseBestBid__factory {
  static readonly abi = _abi;
  static createInterface(): MarsbaseBestBidInterface {
    return new utils.Interface(_abi) as MarsbaseBestBidInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MarsbaseBestBid {
    return new Contract(address, _abi, signerOrProvider) as MarsbaseBestBid;
  }
}
