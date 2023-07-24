const fs = require('fs');
const Web3 = require('web3');

const web3 = new Web3('http://localhost:8546'); // Ethereum node RPC URL

// Read the compiled contract JSON file
const compiledContract = require('./compiledContract.json');

async function deploy() {
  try {
    // Get the contract ABI and bytecode
    const abi = compiledContract['contracts']['ENSRegistry.sol']['ENSRegistry'].abi;
    const bytecode = compiledContract['contracts']['ENSRegistry.sol']['ENSRegistry'].evm.bytecode.object;

    // Set your account address and password
    const accountAddress = '0x228Fd47dE8DaAeabC487450cc863EeCf2430bDf0';
    const accountPassword = 'asdfg35800';

    // Get the available accounts
    // const accounts = await web3.eth.getAccounts();

    // Find the index of the specified account
    // const accountIndex = accounts.findIndex((address) => address.toLowerCase() === accountAddress.toLowerCase());

    // if (accountIndex === -1) {
    //   throw new Error('Account not found');
    // }

    // Unlock the account
    // await web3.eth.personal.unlockAccount(accounts[accountIndex], accountPassword, null);
    await web3.eth.personal.unlockAccount(accountAddress,accountPassword,30)
    const Contract = new web3.eth.Contract(abi);
    const contractInstance = await Contract.deploy({ data: '0x' + bytecode })
      .send({ gas: 2000000, from: accountAddress });

    console.log(`Contract deployed at address: ${contractInstance.options.address}`);
  } catch (error) {
    console.error('Deployment failed:', error);
  }
}

deploy();