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

export type ApprovalForAll = ContractEventLog<{
  account: string;
  operator: string;
  approved: boolean;
  0: string;
  1: string;
  2: boolean;
}>;
export type Paused = ContractEventLog<{
  account: string;
  0: string;
}>;
export type RoleAdminChanged = ContractEventLog<{
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleGranted = ContractEventLog<{
  role: string;
  account: string;
  sender: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleRevoked = ContractEventLog<{
  role: string;
  account: string;
  sender: string;
  0: string;
  1: string;
  2: string;
}>;
export type TransferBatch = ContractEventLog<{
  operator: string;
  from: string;
  to: string;
  ids: string[];
  values: string[];
  0: string;
  1: string;
  2: string;
  3: string[];
  4: string[];
}>;
export type TransferSingle = ContractEventLog<{
  operator: string;
  from: string;
  to: string;
  id: string;
  value: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}>;
export type URI = ContractEventLog<{
  value: string;
  id: string;
  0: string;
  1: string;
}>;
export type Unpaused = ContractEventLog<{
  account: string;
  0: string;
}>;

export interface ERC1155PresetMinterPauser extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): ERC1155PresetMinterPauser;
  clone(): ERC1155PresetMinterPauser;
  methods: {
    DEFAULT_ADMIN_ROLE(): NonPayableTransactionObject<string>;

    MINTER_ROLE(): NonPayableTransactionObject<string>;

    PAUSER_ROLE(): NonPayableTransactionObject<string>;

    balanceOf(
      account: string,
      id: number | string | BN
    ): NonPayableTransactionObject<string>;

    balanceOfBatch(
      accounts: string[],
      ids: (number | string | BN)[]
    ): NonPayableTransactionObject<string[]>;

    burn(
      account: string,
      id: number | string | BN,
      value: number | string | BN
    ): NonPayableTransactionObject<void>;

    burnBatch(
      account: string,
      ids: (number | string | BN)[],
      values: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    getRoleAdmin(role: string | number[]): NonPayableTransactionObject<string>;

    getRoleMember(
      role: string | number[],
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    getRoleMemberCount(
      role: string | number[]
    ): NonPayableTransactionObject<string>;

    grantRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<void>;

    hasRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<boolean>;

    isApprovedForAll(
      account: string,
      operator: string
    ): NonPayableTransactionObject<boolean>;

    mint(
      to: string,
      id: number | string | BN,
      amount: number | string | BN,
      data: string | number[]
    ): NonPayableTransactionObject<void>;

    mintBatch(
      to: string,
      ids: (number | string | BN)[],
      amounts: (number | string | BN)[],
      data: string | number[]
    ): NonPayableTransactionObject<void>;

    pause(): NonPayableTransactionObject<void>;

    paused(): NonPayableTransactionObject<boolean>;

    renounceRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<void>;

    revokeRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<void>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: (number | string | BN)[],
      amounts: (number | string | BN)[],
      data: string | number[]
    ): NonPayableTransactionObject<void>;

    safeTransferFrom(
      from: string,
      to: string,
      id: number | string | BN,
      amount: number | string | BN,
      data: string | number[]
    ): NonPayableTransactionObject<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean
    ): NonPayableTransactionObject<void>;

    supportsInterface(
      interfaceId: string | number[]
    ): NonPayableTransactionObject<boolean>;

    unpause(): NonPayableTransactionObject<void>;

    uri(arg0: number | string | BN): NonPayableTransactionObject<string>;
  };
  events: {
    ApprovalForAll(cb?: Callback<ApprovalForAll>): EventEmitter;
    ApprovalForAll(
      options?: EventOptions,
      cb?: Callback<ApprovalForAll>
    ): EventEmitter;

    Paused(cb?: Callback<Paused>): EventEmitter;
    Paused(options?: EventOptions, cb?: Callback<Paused>): EventEmitter;

    RoleAdminChanged(cb?: Callback<RoleAdminChanged>): EventEmitter;
    RoleAdminChanged(
      options?: EventOptions,
      cb?: Callback<RoleAdminChanged>
    ): EventEmitter;

    RoleGranted(cb?: Callback<RoleGranted>): EventEmitter;
    RoleGranted(
      options?: EventOptions,
      cb?: Callback<RoleGranted>
    ): EventEmitter;

    RoleRevoked(cb?: Callback<RoleRevoked>): EventEmitter;
    RoleRevoked(
      options?: EventOptions,
      cb?: Callback<RoleRevoked>
    ): EventEmitter;

    TransferBatch(cb?: Callback<TransferBatch>): EventEmitter;
    TransferBatch(
      options?: EventOptions,
      cb?: Callback<TransferBatch>
    ): EventEmitter;

    TransferSingle(cb?: Callback<TransferSingle>): EventEmitter;
    TransferSingle(
      options?: EventOptions,
      cb?: Callback<TransferSingle>
    ): EventEmitter;

    URI(cb?: Callback<URI>): EventEmitter;
    URI(options?: EventOptions, cb?: Callback<URI>): EventEmitter;

    Unpaused(cb?: Callback<Unpaused>): EventEmitter;
    Unpaused(options?: EventOptions, cb?: Callback<Unpaused>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "ApprovalForAll", cb: Callback<ApprovalForAll>): void;
  once(
    event: "ApprovalForAll",
    options: EventOptions,
    cb: Callback<ApprovalForAll>
  ): void;

  once(event: "Paused", cb: Callback<Paused>): void;
  once(event: "Paused", options: EventOptions, cb: Callback<Paused>): void;

  once(event: "RoleAdminChanged", cb: Callback<RoleAdminChanged>): void;
  once(
    event: "RoleAdminChanged",
    options: EventOptions,
    cb: Callback<RoleAdminChanged>
  ): void;

  once(event: "RoleGranted", cb: Callback<RoleGranted>): void;
  once(
    event: "RoleGranted",
    options: EventOptions,
    cb: Callback<RoleGranted>
  ): void;

  once(event: "RoleRevoked", cb: Callback<RoleRevoked>): void;
  once(
    event: "RoleRevoked",
    options: EventOptions,
    cb: Callback<RoleRevoked>
  ): void;

  once(event: "TransferBatch", cb: Callback<TransferBatch>): void;
  once(
    event: "TransferBatch",
    options: EventOptions,
    cb: Callback<TransferBatch>
  ): void;

  once(event: "TransferSingle", cb: Callback<TransferSingle>): void;
  once(
    event: "TransferSingle",
    options: EventOptions,
    cb: Callback<TransferSingle>
  ): void;

  once(event: "URI", cb: Callback<URI>): void;
  once(event: "URI", options: EventOptions, cb: Callback<URI>): void;

  once(event: "Unpaused", cb: Callback<Unpaused>): void;
  once(event: "Unpaused", options: EventOptions, cb: Callback<Unpaused>): void;
}