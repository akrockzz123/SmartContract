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

let car;

beforeEach(() => {
    
    car = new Car();

}) ;        // will be executed before every it statement

describe('Car',() => {

    // one or more it statement

    it('park should have a function', () => {

        assert.equal(car.park(), 'stopped');

    });

    it('can drive', () => {

        assert.equal(car.drive(), 'vroom');

    });
});