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
} from "../../../../../types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type ProposalCanceled = ContractEventLog<{
  proposalId: string;
  0: string;
}>;
export type ProposalCreated = ContractEventLog<{
  proposalId: string;
  proposer: string;
  targets: string[];
  values: string[];
  signatures: string[];
  calldatas: string[];
  startBlock: string;
  endBlock: string;
  description: string;
  0: string;
  1: string;
  2: string[];
  3: string[];
  4: string[];
  5: string[];
  6: string;
  7: string;
  8: string;
}>;
export type ProposalExecuted = ContractEventLog<{
  proposalId: string;
  0: string;
}>;
export type ProposalQueued = ContractEventLog<{
  proposalId: string;
  eta: string;
  0: string;
  1: string;
}>;
export type VoteCast = ContractEventLog<{
  voter: string;
  proposalId: string;
  support: string;
  weight: string;
  reason: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}>;
export type VoteCastWithParams = ContractEventLog<{
  voter: string;
  proposalId: string;
  support: string;
  weight: string;
  reason: string;
  params: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}>;

export interface GovernorCompatibilityBravo extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): GovernorCompatibilityBravo;
  clone(): GovernorCompatibilityBravo;
  methods: {
    BALLOT_TYPEHASH(): NonPayableTransactionObject<string>;

    COUNTING_MODE(): NonPayableTransactionObject<string>;

    EXTENDED_BALLOT_TYPEHASH(): NonPayableTransactionObject<string>;

    cancel(proposalId: number | string | BN): NonPayableTransactionObject<void>;

    castVote(
      proposalId: number | string | BN,
      support: number | string | BN
    ): NonPayableTransactionObject<string>;

    castVoteBySig(
      proposalId: number | string | BN,
      support: number | string | BN,
      v: number | string | BN,
      r: string | number[],
      s: string | number[]
    ): NonPayableTransactionObject<string>;

    castVoteWithReason(
      proposalId: number | string | BN,
      support: number | string | BN,
      reason: string
    ): NonPayableTransactionObject<string>;

    castVoteWithReasonAndParams(
      proposalId: number | string | BN,
      support: number | string | BN,
      reason: string,
      params: string | number[]
    ): NonPayableTransactionObject<string>;

    castVoteWithReasonAndParamsBySig(
      proposalId: number | string | BN,
      support: number | string | BN,
      reason: string,
      params: string | number[],
      v: number | string | BN,
      r: string | number[],
      s: string | number[]
    ): NonPayableTransactionObject<string>;

    "execute(address[],uint256[],bytes[],bytes32)"(
      targets: string[],
      values: (number | string | BN)[],
      calldatas: (string | number[])[],
      descriptionHash: string | number[]
    ): PayableTransactionObject<string>;

    "execute(uint256)"(
      proposalId: number | string | BN
    ): PayableTransactionObject<void>;

    getActions(proposalId: number | string | BN): NonPayableTransactionObject<{
      targets: string[];
      values: string[];
      signatures: string[];
      calldatas: string[];
      0: string[];
      1: string[];
      2: string[];
      3: string[];
    }>;

    getReceipt(
      proposalId: number | string | BN,
      voter: string
    ): NonPayableTransactionObject<[boolean, string, string]>;

    getVotes(
      account: string,
      blockNumber: number | string | BN
    ): NonPayableTransactionObject<string>;

    getVotesWithParams(
      account: string,
      blockNumber: number | string | BN,
      params: string | number[]
    ): NonPayableTransactionObject<string>;

    hasVoted(
      proposalId: number | string | BN,
      account: string
    ): NonPayableTransactionObject<boolean>;

    hashProposal(
      targets: string[],
      values: (number | string | BN)[],
      calldatas: (string | number[])[],
      descriptionHash: string | number[]
    ): NonPayableTransactionObject<string>;

    name(): NonPayableTransactionObject<string>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: (number | string | BN)[],
      arg3: (number | string | BN)[],
      arg4: string | number[]
    ): NonPayableTransactionObject<string>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: number | string | BN,
      arg3: number | string | BN,
      arg4: string | number[]
    ): NonPayableTransactionObject<string>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: number | string | BN,
      arg3: string | number[]
    ): NonPayableTransactionObject<string>;

    proposalDeadline(
      proposalId: number | string | BN
    ): NonPayableTransactionObject<string>;

    proposalEta(
      proposalId: number | string | BN
    ): NonPayableTransactionObject<string>;

    proposalSnapshot(
      proposalId: number | string | BN
    ): NonPayableTransactionObject<string>;

    proposalThreshold(): NonPayableTransactionObject<string>;

    proposals(proposalId: number | string | BN): NonPayableTransactionObject<{
      id: string;
      proposer: string;
      eta: string;
      startBlock: string;
      endBlock: string;
      forVotes: string;
      againstVotes: string;
      abstainVotes: string;
      canceled: boolean;
      executed: boolean;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
      8: boolean;
      9: boolean;
    }>;

    "propose(address[],uint256[],bytes[],string)"(
      targets: string[],
      values: (number | string | BN)[],
      calldatas: (string | number[])[],
      description: string
    ): NonPayableTransactionObject<string>;

    "propose(address[],uint256[],string[],bytes[],string)"(
      targets: string[],
      values: (number | string | BN)[],
      signatures: string[],
      calldatas: (string | number[])[],
      description: string
    ): NonPayableTransactionObject<string>;

    "queue(address[],uint256[],bytes[],bytes32)"(
      targets: string[],
      values: (number | string | BN)[],
      calldatas: (string | number[])[],
      descriptionHash: string | number[]
    ): NonPayableTransactionObject<string>;

    "queue(uint256)"(
      proposalId: number | string | BN
    ): NonPayableTransactionObject<void>;

    quorum(
      blockNumber: number | string | BN
    ): NonPayableTransactionObject<string>;

    quorumVotes(): NonPayableTransactionObject<string>;

    relay(
      target: string,
      value: number | string | BN,
      data: string | number[]
    ): NonPayableTransactionObject<void>;

    state(
      proposalId: number | string | BN
    ): NonPayableTransactionObject<string>;

    supportsInterface(
      interfaceId: string | number[]
    ): NonPayableTransactionObject<boolean>;

    timelock(): NonPayableTransactionObject<string>;

    version(): NonPayableTransactionObject<string>;

    votingDelay(): NonPayableTransactionObject<string>;

    votingPeriod(): NonPayableTransactionObject<string>;
  };
  events: {
    ProposalCanceled(cb?: Callback<ProposalCanceled>): EventEmitter;
    ProposalCanceled(
      options?: EventOptions,
      cb?: Callback<ProposalCanceled>
    ): EventEmitter;

    ProposalCreated(cb?: Callback<ProposalCreated>): EventEmitter;
    ProposalCreated(
      options?: EventOptions,
      cb?: Callback<ProposalCreated>
    ): EventEmitter;

    ProposalExecuted(cb?: Callback<ProposalExecuted>): EventEmitter;
    ProposalExecuted(
      options?: EventOptions,
      cb?: Callback<ProposalExecuted>
    ): EventEmitter;

    ProposalQueued(cb?: Callback<ProposalQueued>): EventEmitter;
    ProposalQueued(
      options?: EventOptions,
      cb?: Callback<ProposalQueued>
    ): EventEmitter;

    VoteCast(cb?: Callback<VoteCast>): EventEmitter;
    VoteCast(options?: EventOptions, cb?: Callback<VoteCast>): EventEmitter;

    VoteCastWithParams(cb?: Callback<VoteCastWithParams>): EventEmitter;
    VoteCastWithParams(
      options?: EventOptions,
      cb?: Callback<VoteCastWithParams>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "ProposalCanceled", cb: Callback<ProposalCanceled>): void;
  once(
    event: "ProposalCanceled",
    options: EventOptions,
    cb: Callback<ProposalCanceled>
  ): void;

  once(event: "ProposalCreated", cb: Callback<ProposalCreated>): void;
  once(
    event: "ProposalCreated",
    options: EventOptions,
    cb: Callback<ProposalCreated>
  ): void;

  once(event: "ProposalExecuted", cb: Callback<ProposalExecuted>): void;
  once(
    event: "ProposalExecuted",
    options: EventOptions,
    cb: Callback<ProposalExecuted>
  ): void;

  once(event: "ProposalQueued", cb: Callback<ProposalQueued>): void;
  once(
    event: "ProposalQueued",
    options: EventOptions,
    cb: Callback<ProposalQueued>
  ): void;

  once(event: "VoteCast", cb: Callback<VoteCast>): void;
  once(event: "VoteCast", options: EventOptions, cb: Callback<VoteCast>): void;

  once(event: "VoteCastWithParams", cb: Callback<VoteCastWithParams>): void;
  once(
    event: "VoteCastWithParams",
    options: EventOptions,
    cb: Callback<VoteCastWithParams>
  ): void;
}
