const assert = require('assert'); // one value is equal to another

const ganache = require('ganache-cli');

const Web3 = require('web3') // constructor of web3

const web3 = new Web3(ganache.provider()); // create instance of web3 and connect to etherium network using provider



class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

beforeEach(() => {
    // get a list of accounts(just for sending and reciving ether)

    //web3 functions are asynchronous in nature

    web3.eth.getAccounts()
        .then(fetchedAccounts => {

            console.log(fetchedAccounts);
        });

        // use one of those accounts to deploy the contracts


});

// making each contracts
describe('Inbox', () => {

    it('deploys a contract', () => {


    });
})