export const ABI = [
  {
    inputs: [],
    name: "emailsReceived",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "string",
            name: "subject",
            type: "string",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        internalType: "struct BrrdEmailService.Mail[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emailsSent",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "string",
            name: "subject",
            type: "string",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        internalType: "struct BrrdEmailService.Mail[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "string",
        name: "subject",
        type: "string",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "sendEmail",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]

export const ADDRESS = "0x92164E5c66B144a529c5a889F0567D343D4d0631"
