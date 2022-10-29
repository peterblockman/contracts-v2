/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IMarsbaseSink,
  IMarsbaseSinkInterface,
} from "../../../../contracts/mocks/MarsBaseSwapMock.sol/IMarsbaseSink";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "liquidateToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IMarsbaseSink__factory {
  static readonly abi = _abi;
  static createInterface(): IMarsbaseSinkInterface {
    return new utils.Interface(_abi) as IMarsbaseSinkInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMarsbaseSink {
    return new Contract(address, _abi, signerOrProvider) as IMarsbaseSink;
  }
}