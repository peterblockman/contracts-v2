/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "../../types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export interface IUniswapV2Router02 extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): IUniswapV2Router02;
  clone(): IUniswapV2Router02;
  methods: {
    WETH(): NonPayableTransactionObject<string>;

    swapExactTokensForTokens(
      amountIn: number | string | BN,
      amountOutMin: number | string | BN,
      path: string[],
      to: string,
      deadline: number | string | BN
    ): NonPayableTransactionObject<string[]>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
