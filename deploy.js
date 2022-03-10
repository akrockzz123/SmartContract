const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');

const { interface,bytecode} = require('./compile')

const provider = new HDWalletProvider(
    'sadness slow always beyond attack output area once next gesture task wise', // unlocking rinkeby account

    'https://rinkeby.infura.io/v3/fa3db464f8f545dba1bf89409573e397'

);

const web3 = new Web3(provider) //now we can interact with rinkeby test network

// use this instance to interact with network

const deploy = async() => {

    // list of accounts unlocked by provider

    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from accounts',accounts[0]);

    
    const result = await new web3.eth.Contract(JSON.parse(interface))
              .deploy({ data: bytecode, arguments: ['Hi there']})
              .send({ from : accounts[0], gas: '1000000'})

    console.log(result.options.address)
};

deploy();