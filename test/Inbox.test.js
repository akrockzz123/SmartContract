const assert = require('assert'); // one value is equal to another

const ganache = require('ganache-cli');

const Web3 = require('web3') // constructor of web3

const web3 = new Web3(ganache.provider()); // create instance of web3 and connect to etherium network using provider

const { interface,bytecode } = require('../compile') 




let accounts;
let inbox;

beforeEach(async () => {
    // get a list of accounts(just for sending and reciving ether)

    //web3 functions are asynchronous in nature

    accounts = await web3.eth.getAccounts()
      

        // use one of those accounts to deploy the contracts
        // changing value of contract consumes gas
        inbox = await new web3.eth.Contract(JSON.parse(interface))
              .deploy({ data: bytecode, arguments: ['Hi there']})
              .send({ from : accounts[0], gas: '1000000'})
});

// making each contracts
describe('Inbox', () => {

    it('deploys a contract', () => {

        console.log(inbox);

    });
})