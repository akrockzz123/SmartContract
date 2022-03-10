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
        // changing value of contract consumes gas //Contract(ABI)
        inbox = await new web3.eth.Contract(JSON.parse(interface))
              .deploy({ data: bytecode, arguments: ['Hi there']})
              .send({ from : accounts[0], gas: '1000000'})
});

// making each contracts
describe('Inbox', () => {

    it('deploys a contract', () => {

        assert.ok(inbox.options.address);

    });

    // calling a method in inbox contract

    it('has a default message', async () => {

         const message = await inbox.methods.message().call(); // calling the message function from returned javascript rep of contract

         assert.equal(message,'Hi there');

    });

    // changing the message

    it('can change the message',async () => {

        //send transaction who is paying gas for the transaction gnash test accounts
        await inbox.methods.setMessage('bye there').send({ from : accounts[0] });

        const message = await inbox.methods.message().call(); // calling the message function from returned javascript rep of contract

        assert.equal(message,'bye there');
    });
})