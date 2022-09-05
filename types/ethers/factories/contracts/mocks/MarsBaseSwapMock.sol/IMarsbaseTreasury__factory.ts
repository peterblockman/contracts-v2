/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IMarsbaseTreasury,
  IMarsbaseTreasuryInterface,
} from "../../../../contracts/mocks/MarsBaseSwapMock.sol/IMarsbaseTreasury";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
        ],
        internalType: "struct IMarsbaseTreasury.Coupon",
        name: "coupon",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        internalType: "struct IMarsbaseTreasury.CouponSig",
        name: "sig",
        type: "tuple",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IMarsbaseTreasury__factory {
  static readonly abi = _abi;
  static createInterface(): IMarsbaseTreasuryInterface {
    return new utils.Interface(_abi) as IMarsbaseTreasuryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMarsbaseTreasury {
    return new Contract(address, _abi, signerOrProvider) as IMarsbaseTreasury;
  }
}
