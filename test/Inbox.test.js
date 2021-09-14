const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

const INITIAL_STRING = 'Hi there!';
let accounts;
let inbox;

beforeEach(async () => {

  //get a list of all accounts
  accounts = await web3.eth.getAccounts();

  //use account to deploy contracts
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING]})
    .send({ from: accounts[0], gas: '1000000' });
});

describe('deploys a contract', () => {
  it('Inbox contract', () => {
    assert.ok(inbox.options.address); // the Deployed contract actually has an address as it's been correctly deployed
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call(); //We just want to call the message method, calls are free
    assert.equal(message, INITIAL_STRING);
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('new message').send({ from: accounts[0] }); // As we have an action, we need to send a Tx and specify who pays, it returns a Tx hash
    const message = await inbox.methods.message().call();
    assert.equal(message, 'new message');
  })
});
