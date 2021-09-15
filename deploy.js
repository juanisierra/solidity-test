const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

//Mneumonic prhase and infura rinkeby endpoint
const provider = new HDWalletProvider(
  'loyal render state glimpse glass convince riot critic grunt pepper protect peace',
  'https://rinkeby.infura.io/v3/da3a1c7eedbf42c680aadd685e006a96'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy() // Any constructor arguments should be parameters in this function
    .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

    console.log('Contract deployed to ', result.options.address);
};

deploy();
