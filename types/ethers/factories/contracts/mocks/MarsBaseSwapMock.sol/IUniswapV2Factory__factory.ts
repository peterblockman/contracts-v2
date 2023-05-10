/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IUniswapV2Factory,
  IUniswapV2FactoryInterface,
} from "../../../../contracts/mocks/MarsBaseSwapMock.sol/IUniswapV2Factory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
    ],
    name: "getPair",
    outputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IUniswapV2Factory__factory {
  static readonly abi = _abi;
  static createInterface(): IUniswapV2FactoryInterface {
    return new utils.Interface(_abi) as IUniswapV2FactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IUniswapV2Factory {
    return new Contract(address, _abi, signerOrProvider) as IUniswapV2Factory;
  }
}
