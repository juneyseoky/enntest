const test = artifacts.require("./ENSRegistry")
const web3= require('web3')

const Web3 = new web3('http://127.0.0.1:8546')

module.exports = function(deployer) {
    Web3.eth.personal.unlockAccount("0x62e1a3333390e94c70ba9dca02be33096ae97573","asdfg35800",36000)
    deployer.then(async () => {
    await Web3.eth.personal.unlockAccount("0x62e1a3333390e94c70ba9dca02be33096ae97573","asdfg35800",36000)
    await deployer.deploy(test, { from: "0x62e1a3333390e94c70ba9dca02be33096ae97573"});
    console.log("Contract Deployed");
    });
};