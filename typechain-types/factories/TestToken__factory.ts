/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {Signer, utils, Contract, ContractFactory, Overrides} from "ethers";
import {Provider, TransactionRequest} from "@ethersproject/providers";
import type {TestToken, TestTokenInterface} from "../TestToken";

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
  "0x60806040523480156200001157600080fd5b506040518060400160405280600481526020016315195cdd60e21b81525060405180604001604052806004815260200163151154d560e21b815250816003908051906020019062000064929190620001a7565b5080516200007a906004906020840190620001a7565b505050620000b43362000092620000ba60201b60201c565b6200009f90600a620002b5565b620000ae90620186a0620003ad565b620000bf565b62000422565b601290565b6001600160a01b0382166200011a5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200012e91906200024d565b90915550506001600160a01b038216600090815260208190526040812080548392906200015d9084906200024d565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001b590620003cf565b90600052602060002090601f016020900481019282620001d9576000855562000224565b82601f10620001f457805160ff191683800117855562000224565b8280016001018555821562000224579182015b828111156200022457825182559160200191906001019062000207565b506200023292915062000236565b5090565b5b8082111562000232576000815560010162000237565b600082198211156200026357620002636200040c565b500190565b80825b60018086116200027c5750620002ac565b8187048211156200029157620002916200040c565b808616156200029f57918102915b9490941c9380026200026b565b94509492505050565b6000620002c960001960ff851684620002d0565b9392505050565b600082620002e157506001620002c9565b81620002f057506000620002c9565b8160018114620003095760028114620003145762000348565b6001915050620002c9565b60ff8411156200032857620003286200040c565b6001841b9150848211156200034157620003416200040c565b50620002c9565b5060208310610133831016604e8410600b841016171562000380575081810a838111156200037a576200037a6200040c565b620002c9565b6200038f848484600162000268565b808604821115620003a457620003a46200040c565b02949350505050565b6000816000190483118215151615620003ca57620003ca6200040c565b500290565b600181811c90821680620003e457607f821691505b602082108114156200040657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6108b080620004326000396000f3fe608060405234801561001057600080fd5b50600436106100995760003560e01c806306fdde031461009e578063095ea7b3146100bc57806318160ddd146100df57806323b872dd146100f1578063313ce56714610104578063395093511461011357806370a082311461012657806395d89b4114610139578063a457c2d714610141578063a9059cbb14610154578063dd62ed3e14610167575b600080fd5b6100a66101a0565b6040516100b391906107c8565b60405180910390f35b6100cf6100ca36600461079f565b610232565b60405190151581526020016100b3565b6002545b6040519081526020016100b3565b6100cf6100ff366004610764565b610248565b604051601281526020016100b3565b6100cf61012136600461079f565b6102f7565b6100e3610134366004610711565b610333565b6100a6610352565b6100cf61014f36600461079f565b610361565b6100cf61016236600461079f565b6103fa565b6100e3610175366004610732565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101af9061083f565b80601f01602080910402602001604051908101604052809291908181526020018280546101db9061083f565b80156102285780601f106101fd57610100808354040283529160200191610228565b820191906000526020600020905b81548152906001019060200180831161020b57829003601f168201915b5050505050905090565b600061023f338484610407565b50600192915050565b600061025584848461052b565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156102df5760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b6102ec8533858403610407565b506001949350505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909161023f91859061032e90869061081b565b610407565b6001600160a01b0381166000908152602081905260409020545b919050565b6060600480546101af9061083f565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156103e35760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016102d6565b6103f03385858403610407565b5060019392505050565b600061023f33848461052b565b6001600160a01b0383166104695760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016102d6565b6001600160a01b0382166104ca5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016102d6565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b03831661058f5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016102d6565b6001600160a01b0382166105f15760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016102d6565b6001600160a01b038316600090815260208190526040902054818110156106695760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016102d6565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906106a090849061081b565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106ec91815260200190565b60405180910390a350505050565b80356001600160a01b038116811461034d57600080fd5b600060208284031215610722578081fd5b61072b826106fa565b9392505050565b60008060408385031215610744578081fd5b61074d836106fa565b915061075b602084016106fa565b90509250929050565b600080600060608486031215610778578081fd5b610781846106fa565b925061078f602085016106fa565b9150604084013590509250925092565b600080604083850312156107b1578182fd5b6107ba836106fa565b946020939093013593505050565b6000602080835283518082850152825b818110156107f4578581018301518582016040015282016107d8565b818111156108055783604083870101525b50601f01601f1916929092016040019392505050565b6000821982111561083a57634e487b7160e01b81526011600452602481fd5b500190565b600181811c9082168061085357607f821691505b6020821081141561087457634e487b7160e01b600052602260045260246000fd5b5091905056fea2646970667358221220ba0210383cff90ea7b4e42e4c2750cf828b86c7dae94ad30b5263a8017c670d664736f6c63430008030033";

type TestTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestToken__factory extends ContractFactory {
  constructor(...args: TestTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "TestToken";
  }

  deploy(
    overrides?: Overrides & {from?: string | Promise<string>}
  ): Promise<TestToken> {
    return super.deploy(overrides || {}) as Promise<TestToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & {from?: string | Promise<string>}
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestToken {
    return super.attach(address) as TestToken;
  }
  connect(signer: Signer): TestToken__factory {
    return super.connect(signer) as TestToken__factory;
  }
  static readonly contractName: "TestToken";
  public readonly contractName: "TestToken";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestTokenInterface {
    return new utils.Interface(_abi) as TestTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestToken {
    return new Contract(address, _abi, signerOrProvider) as TestToken;
  }
}
