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
} from "../../../../../../types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export interface ERC1155Receiver extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): ERC1155Receiver;
  clone(): ERC1155Receiver;
  methods: {
    onERC1155BatchReceived(
      operator: string,
      from: string,
      ids: (number | string | BN)[],
      values: (number | string | BN)[],
      data: string | number[]
    ): NonPayableTransactionObject<string>;

    onERC1155Received(
      operator: string,
      from: string,
      id: number | string | BN,
      value: number | string | BN,
      data: string | number[]
    ): NonPayableTransactionObject<string>;

    supportsInterface(
      interfaceId: string | number[]
    ): NonPayableTransactionObject<boolean>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
