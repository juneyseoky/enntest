const express = require('express')
const router = express.Router()
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://1d61-119-192-224-93.ngrok-free.app/geth'));

const ENSRegistryJSON = require('../build/contracts/ENSRegistry.json');
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
const contractAddress = process.env.CONTRACT_ADDRESS;
const { resolveENS } = require('../web3/test.js');
// const contract = new web3.eth.Contract(contractABI, contractAddress);


module.exports = ()=>{
    router.get('/ens', async (req, res) => {
        const { ensName } = req.query;
        if (!ensName) {
            return res.status(400).json({ error: 'ENS name is required' });
        }

        const address = await resolveENS(ensName);

        if (!address) {
            return res.status(404).json({ error: 'ENS name not found' });
        }

        res.json({ ensName, address });
    });
    
    return router
}