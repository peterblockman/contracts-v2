/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BAT, BATInterface } from "../BAT";

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
  "0x60806040523480156200001157600080fd5b506040518060400160405280601581526020017f426173696320417474656e74696f6e20546f6b656e00000000000000000000008152506040518060400160405280600381526020016210905560ea1b81525081600390805190602001906200007c929190620001bf565b50805162000092906004906020840190620001bf565b505050620000cc33620000aa620000d260201b60201c565b620000b790600a6200037a565b620000c690620186a062000392565b620000d7565b6200040b565b601290565b6001600160a01b038216620001325760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620001469190620003b4565b90915550506001600160a01b0382166000908152602081905260408120805483929062000175908490620003b4565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001cd90620003cf565b90600052602060002090601f016020900481019282620001f157600085556200023c565b82601f106200020c57805160ff19168380011785556200023c565b828001600101855582156200023c579182015b828111156200023c5782518255916020019190600101906200021f565b506200024a9291506200024e565b5090565b5b808211156200024a57600081556001016200024f565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620002bc578160001904821115620002a057620002a062000265565b80851615620002ae57918102915b93841c939080029062000280565b509250929050565b600082620002d55750600162000374565b81620002e45750600062000374565b8160018114620002fd5760028114620003085762000328565b600191505062000374565b60ff8411156200031c576200031c62000265565b50506001821b62000374565b5060208310610133831016604e8410600b84101617156200034d575081810a62000374565b6200035983836200027b565b806000190482111562000370576200037062000265565b0290505b92915050565b60006200038b60ff841683620002c4565b9392505050565b6000816000190483118215151615620003af57620003af62000265565b500290565b60008219821115620003ca57620003ca62000265565b500190565b600181811c90821680620003e457607f821691505b6020821081036200040557634e487b7160e01b600052602260045260246000fd5b50919050565b6108b3806200041b6000396000f3fe608060405234801561001057600080fd5b50600436106100995760003560e01c806306fdde031461009e578063095ea7b3146100bc57806318160ddd146100df57806323b872dd146100f1578063313ce56714610104578063395093511461011357806370a082311461012657806395d89b411461014f578063a457c2d714610157578063a9059cbb1461016a578063dd62ed3e1461017d575b600080fd5b6100a66101b6565b6040516100b391906106f1565b60405180910390f35b6100cf6100ca366004610762565b610248565b60405190151581526020016100b3565b6002545b6040519081526020016100b3565b6100cf6100ff36600461078c565b61025e565b604051601281526020016100b3565b6100cf610121366004610762565b61030d565b6100e36101343660046107c8565b6001600160a01b031660009081526020819052604090205490565b6100a6610349565b6100cf610165366004610762565b610358565b6100cf610178366004610762565b6103f1565b6100e361018b3660046107ea565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101c59061081d565b80601f01602080910402602001604051908101604052809291908181526020018280546101f19061081d565b801561023e5780601f106102135761010080835404028352916020019161023e565b820191906000526020600020905b81548152906001019060200180831161022157829003601f168201915b5050505050905090565b60006102553384846103fe565b50600192915050565b600061026b848484610522565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156102f55760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b61030285338584036103fe565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091610255918590610344908690610857565b6103fe565b6060600480546101c59061081d565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156103da5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016102ec565b6103e733858584036103fe565b5060019392505050565b6000610255338484610522565b6001600160a01b0383166104605760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016102ec565b6001600160a01b0382166104c15760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016102ec565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166105865760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016102ec565b6001600160a01b0382166105e85760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016102ec565b6001600160a01b038316600090815260208190526040902054818110156106605760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016102ec565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610697908490610857565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106e391815260200190565b60405180910390a350505050565b600060208083528351808285015260005b8181101561071e57858101830151858201604001528201610702565b81811115610730576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461075d57600080fd5b919050565b6000806040838503121561077557600080fd5b61077e83610746565b946020939093013593505050565b6000806000606084860312156107a157600080fd5b6107aa84610746565b92506107b860208501610746565b9150604084013590509250925092565b6000602082840312156107da57600080fd5b6107e382610746565b9392505050565b600080604083850312156107fd57600080fd5b61080683610746565b915061081460208401610746565b90509250929050565b600181811c9082168061083157607f821691505b60208210810361085157634e487b7160e01b600052602260045260246000fd5b50919050565b6000821982111561087857634e487b7160e01b600052601160045260246000fd5b50019056fea26469706673582212206e41d5ab747b94c717920c95f66d638a2fdcbcf4b065208940163b49f797898664736f6c634300080d0033";

type BATConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BATConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BAT__factory extends ContractFactory {
  constructor(...args: BATConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "BAT";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BAT> {
    return super.deploy(overrides || {}) as Promise<BAT>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BAT {
    return super.attach(address) as BAT;
  }
  connect(signer: Signer): BAT__factory {
    return super.connect(signer) as BAT__factory;
  }
  static readonly contractName: "BAT";
  public readonly contractName: "BAT";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BATInterface {
    return new utils.Interface(_abi) as BATInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): BAT {
    return new Contract(address, _abi, signerOrProvider) as BAT;
  }
}
