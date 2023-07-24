const Web3 = require('web3');
require('dotenv').config();
const web3 = new Web3(process.env.PROVIDER);
const ensRegistry = require('../build/contracts/ENSRegistry.json');
// console.log(ensRegistry)
// console.log(process.env.PRIVATE_KEY)
// Set the private key for your wallet - 내 키
const walletAddress   = process.env.WALLET_ADDRESS
const privateKey      = process.env.PRIVATE_KEY;
const accountPassword = process.env.ACCOUNT_PASSWORD;
const contractAddress = process.env.CONTRACT_ADDRESS;
// Create an account from the private key
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
// Unlock the account if necessary - 패스워드
// web3.eth.personal.unlockAccount(account.address, accountPassword, 600)
//   .then(() => {
// ABI (Application Binary Interface) of the contract
const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "NewName",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "resolve",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "registerName",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "newAddr",
          "type": "address"
        }
      ],
      "name": "updateAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "getNameByAddress",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]
// ---읽기 시작---
const contract = new web3.eth.Contract(contractABI, contractAddress);
// 'owner' 메소드 호출 예제
const name = 'eth.eth';

// contract.methods.owner(name).call()
// .then((result) => {
//     console.log('owner of', name, 'is', result);
// }).catch((err) => {
// console.log(err)
// });
// contract.methods.getNameByAddress(walletAddress).call()
// .then((name) => {
//     console.log(name);
// })
// .catch((err) => {
//     console.error(err);
// });


// contract.methods.resolve('woo.eth').call()
// .then((result) => {
//     console.log('address of', 'woo.eth', 'is', result);
// });
// contract.methods.getNameByAddress(walletAddress).call()
// .then((result) => {
//     if (result === '') {
//         console.log('No name found for the address:', walletAddress);
//     } else {
//         console.log('Name for the address',walletAddress, 'is', result);
//     }
// }).catch((err) => {
//     console.log(err);
// });

//----읽기종료 -----

// //---쓰기 시작 -----
// web3.eth.personal.unlockAccount(walletAddress, accountPassword, 600)
//     .then(() => {
//         web3.eth.getAccounts().then(async (accounts) => {
//             // check if the account is unlocked and available
//             if (accounts.includes(walletAddress)) {
        
//                 const receipt = await registerName(name,walletAddress)

        
//                 if (receipt.events && receipt.events.NewName) {
//                     console.log('NewName event:', receipt.events.NewName.returnValues);
//                 } else {
//                     console.log('No NewName event found.');
//                 }
        
//                 // check name resolution
//                 const resolvedAddress = await contract.methods.resolve(name).call();
        
//                 console.log('Resolved address:', resolvedAddress);
//             } else {
//                 console.error('Account is not available or not unlocked.');
//             }
//         }).catch((error) => {
//                 console.error('Error:', error);
//             });
//     })
//     .catch((error) => {
//     console.error('Account unlock error:', error);
//     });


async function registerName(name,address){
    const data = web3.eth.abi.encodeFunctionCall({
        name: 'registerName',
        type: 'function',
        inputs: [{
            type: 'string',
            name: 'name'
        },
        {
            type: 'address',
            name: 'addr'
        }]
    }, [name,address]);

    const gasEstimate = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: data
    });
    
    const tx = {
            gas: gasEstimate,
            gasPrice: web3.utils.toWei('1', 'gwei'),
            to: contractAddress,
            from: address,
            data: data,
            value:0x0
        }

    const signed = await web3.eth.accounts.signTransaction(tx, privateKey)
    console.log(signed)

    const result = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log(result)
    
}

async function resolveENS(name) {
    console.debug("!!!!!>>>", name)
    try {
        const address = await contract.methods.resolve(name).call();
        return address;
    } catch (error) {
    console.error(error);
        return null;
    }
}
contract.methods.resolve('woo.eth').call()
.then((result) => {
    console.log('address of', 'is', result);
});

module.exports = { resolveENS, registerName };