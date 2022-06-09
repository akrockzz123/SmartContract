
const assert = require('assert')

const ganache = require('ganache-cli')

const Web3 = require('web3')

const web3 = new Web3(ganache.provider())

const {interface, bytecode} = require('../compile')

let lottery;

let accounts;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data : bytecode})
     .send({from : accounts[0],gas : '1000000'})

})


describe('Lottery Contract', () => {

   it('deploys a contract', () => {
       assert.ok(lottery.options.address) // address that our contract was eployes to local test network
   });

   it('allows one account to enter', async () => { // entering lottery
       await lottery.methods.enter().send({
           from: accounts[0],
           value: web3.utils.toWei('0.02', 'ether')
       });

       const players = await lottery.methods.getPlayers().call({

        from: accounts[0]
       });

       assert.equal(accounts[0],players[0]) // equal address

       assert.equal(1,players.length) // only one player enter lottery



   });


   it('allows multiple account to enter', async () => { // entering lottery
    await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.02', 'ether')
    });

    await lottery.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei('0.02', 'ether')
    });

    await lottery.methods.enter().send({
        from: accounts[2],
        value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({

     from: accounts[0]
    });

    assert.equal(accounts[0],players[0]) // equal address
    assert.equal(accounts[1],players[1])
    assert.equal(accounts[2],players[2])

    assert.equal(3,players.length) // only one player enter lottery
});

    it('requires a minimum amount of ther to enter', async () => {

        try {

            await lottery.methods.enter().send({

                from: accounts[0],
                value: 100
            });

            assert(false);

        } catch(err) {

            assert(err) // assert.ok only assures some value is passed to function
        }
        
    });


    it('only manager can call pickWinner function', async () => {

        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });

            assert(false)

        } catch (err) {
            assert(err)
        }
    });


    it('sends money tot the winner and resets the player array', async () => {

        await lottery.methods.enter().send({

            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({ // for every transaction we do we have to give some amount of money in terms of gas

            from: accounts[0]
        });

        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance - initialBalance

        console.log(difference)

        assert(difference > web3.utils.toWei('1.8','ether')) // 0.2 => some amount of money on gas

    });

});

   
