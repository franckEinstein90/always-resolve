/*******************************************************************
 * unit tests for events namespace objects and functions
 * FranckEinstein90
 ********************************************************************/

const expect = require('chai').expect
const validator = require('validator')

const EventProto  = require('../src/events/eventProto').EventProto

describe('health check', function() {

    it("events module exists",function(){
        expect(EventProto).to.not.be.undefined
    })

    it("has a an EventProto constructor",function(){
        let ev = new EventProto()
        expect(ev).to.not.be.undefined
    })

})

