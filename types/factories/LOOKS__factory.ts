/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LOOKS, LOOKSInterface } from "../LOOKS";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040805180820182526005808252644c4f4f4b5360d81b602080840182815285518087019096529285528401528151919291620000529160039162000178565b5080516200006890600490602084019062000178565b5050506200008a336c0c9f2c9cd04674edea400000006200009060201b60201c565b62000281565b6001600160a01b038216620000eb5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000ff91906200021e565b90915550506001600160a01b038216600090815260208190526040812080548392906200012e9084906200021e565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001869062000245565b90600052602060002090601f016020900481019282620001aa5760008555620001f5565b82601f10620001c557805160ff1916838001178555620001f5565b82800160010185558215620001f5579182015b82811115620001f5578251825591602001919060010190620001d8565b506200020392915062000207565b5090565b5b8082111562000203576000815560010162000208565b600082198211156200024057634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200025a57607f821691505b6020821081036200027b57634e487b7160e01b600052602260045260246000fd5b50919050565b6108b380620002916000396000f3fe608060405234801561001057600080fd5b50600436106100995760003560e01c806306fdde031461009e578063095ea7b3146100bc57806318160ddd146100df57806323b872dd146100f1578063313ce56714610104578063395093511461011357806370a082311461012657806395d89b411461014f578063a457c2d714610157578063a9059cbb1461016a578063dd62ed3e1461017d575b600080fd5b6100a66101b6565b6040516100b391906106f1565b60405180910390f35b6100cf6100ca366004610762565b610248565b60405190151581526020016100b3565b6002545b6040519081526020016100b3565b6100cf6100ff36600461078c565b61025e565b604051601281526020016100b3565b6100cf610121366004610762565b61030d565b6100e36101343660046107c8565b6001600160a01b031660009081526020819052604090205490565b6100a6610349565b6100cf610165366004610762565b610358565b6100cf610178366004610762565b6103f1565b6100e361018b3660046107ea565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101c59061081d565b80601f01602080910402602001604051908101604052809291908181526020018280546101f19061081d565b801561023e5780601f106102135761010080835404028352916020019161023e565b820191906000526020600020905b81548152906001019060200180831161022157829003601f168201915b5050505050905090565b60006102553384846103fe565b50600192915050565b600061026b848484610522565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156102f55760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b61030285338584036103fe565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091610255918590610344908690610857565b6103fe565b6060600480546101c59061081d565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156103da5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016102ec565b6103e733858584036103fe565b5060019392505050565b6000610255338484610522565b6001600160a01b0383166104605760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016102ec565b6001600160a01b0382166104c15760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016102ec565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166105865760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016102ec565b6001600160a01b0382166105e85760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016102ec565b6001600160a01b038316600090815260208190526040902054818110156106605760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016102ec565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610697908490610857565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106e391815260200190565b60405180910390a350505050565b600060208083528351808285015260005b8181101561071e57858101830151858201604001528201610702565b81811115610730576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461075d57600080fd5b919050565b6000806040838503121561077557600080fd5b61077e83610746565b946020939093013593505050565b6000806000606084860312156107a157600080fd5b6107aa84610746565b92506107b860208501610746565b9150604084013590509250925092565b6000602082840312156107da57600080fd5b6107e382610746565b9392505050565b600080604083850312156107fd57600080fd5b61080683610746565b915061081460208401610746565b90509250929050565b600181811c9082168061083157607f821691505b60208210810361085157634e487b7160e01b600052602260045260246000fd5b50919050565b6000821982111561087857634e487b7160e01b600052601160045260246000fd5b50019056fea2646970667358221220760129ecc03656087140d796b91766c225d08185bdfddf1b62b6393d400788b464736f6c634300080d0033";

type LOOKSConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LOOKSConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LOOKS__factory extends ContractFactory {
  constructor(...args: LOOKSConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "LOOKS";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LOOKS> {
    return super.deploy(overrides || {}) as Promise<LOOKS>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): LOOKS {
    return super.attach(address) as LOOKS;
  }
  connect(signer: Signer): LOOKS__factory {
    return super.connect(signer) as LOOKS__factory;
  }
  static readonly contractName: "LOOKS";
  public readonly contractName: "LOOKS";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LOOKSInterface {
    return new utils.Interface(_abi) as LOOKSInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): LOOKS {
    return new Contract(address, _abi, signerOrProvider) as LOOKS;
  }
}