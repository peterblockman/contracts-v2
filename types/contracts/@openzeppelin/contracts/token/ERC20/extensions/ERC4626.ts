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

export type Approval = ContractEventLog<{
  owner: string;
  spender: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type Deposit = ContractEventLog<{
  caller: string;
  owner: string;
  assets: string;
  shares: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type Withdraw = ContractEventLog<{
  caller: string;
  receiver: string;
  owner: string;
  assets: string;
  shares: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}>;

export interface ERC4626 extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): ERC4626;
  clone(): ERC4626;
  methods: {
    allowance(
      owner: string,
      spender: string
    ): NonPayableTransactionObject<string>;

    approve(
      spender: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    asset(): NonPayableTransactionObject<string>;

    balanceOf(account: string): NonPayableTransactionObject<string>;

    convertToAssets(
      shares: number | string | BN
    ): NonPayableTransactionObject<string>;

    convertToShares(
      assets: number | string | BN
    ): NonPayableTransactionObject<string>;

    decimals(): NonPayableTransactionObject<string>;

    decreaseAllowance(
      spender: string,
      subtractedValue: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    deposit(
      assets: number | string | BN,
      receiver: string
    ): NonPayableTransactionObject<string>;

    increaseAllowance(
      spender: string,
      addedValue: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    maxDeposit(arg0: string): NonPayableTransactionObject<string>;

    maxMint(arg0: string): NonPayableTransactionObject<string>;

    maxRedeem(owner: string): NonPayableTransactionObject<string>;

    maxWithdraw(owner: string): NonPayableTransactionObject<string>;

    mint(
      shares: number | string | BN,
      receiver: string
    ): NonPayableTransactionObject<string>;

    name(): NonPayableTransactionObject<string>;

    previewDeposit(
      assets: number | string | BN
    ): NonPayableTransactionObject<string>;

    previewMint(
      shares: number | string | BN
    ): NonPayableTransactionObject<string>;

    previewRedeem(
      shares: number | string | BN
    ): NonPayableTransactionObject<string>;

    previewWithdraw(
      assets: number | string | BN
    ): NonPayableTransactionObject<string>;

    redeem(
      shares: number | string | BN,
      receiver: string,
      owner: string
    ): NonPayableTransactionObject<string>;

    symbol(): NonPayableTransactionObject<string>;

    totalAssets(): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    transfer(
      to: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferFrom(
      from: string,
      to: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    withdraw(
      assets: number | string | BN,
      receiver: string,
      owner: string
    ): NonPayableTransactionObject<string>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    Deposit(cb?: Callback<Deposit>): EventEmitter;
    Deposit(options?: EventOptions, cb?: Callback<Deposit>): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    Withdraw(cb?: Callback<Withdraw>): EventEmitter;
    Withdraw(options?: EventOptions, cb?: Callback<Withdraw>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "Deposit", cb: Callback<Deposit>): void;
  once(event: "Deposit", options: EventOptions, cb: Callback<Deposit>): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;

  once(event: "Withdraw", cb: Callback<Withdraw>): void;
  once(event: "Withdraw", options: EventOptions, cb: Callback<Withdraw>): void;
}
