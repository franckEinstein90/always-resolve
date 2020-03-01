/*******************************************************************
 * unit tests for events namespace objects and functions
 * FranckEinstein90
 ********************************************************************/

const expect = require('chai').expect
const validator = require('validator')
const events = require('../src/events/events').events

/*************************************************************
 * events.Registrar
 * FranckEinstein90
 * -------------------
 *  Structure into which events can be registered. Provides
 *  various operations on the set of registered events, map, 
 *  filter, reduce
 * **********************************************************/


describe('health check', function() {

    it("events module exists",function(){
        expect(events).to.not.be.undefined
    })

    it("can create Event objects", function() {
        let ev = new events.Event()
        expect(ev).to.not.be.undefined
    })

})

describe('events.event Object', function() {

/******************************************************************************
 * construction tests
 ******************************************************************************/
   it("can be created with state 'off' by argument", function() {
        let ev = new events.Event(events.eventState.off);
        expect(ev.isOn).to.equal(false);
        expect(ev.isOff).to.equal(true);
        expect(ev.state).to.equal(events.eventState.off);
    })

    it("has a unique identifier", function() {
        let ev = new events.Event();
        expect(validator.isUUID(ev.id)).to.equal(true);
    })

    describe("events.Event.off()", function() {
        it("turns off the event", function() {
            let ev = new events.Event();
            ev.off();
            expect(ev.state).to.equal(events.eventState.off);
            expect(ev.isOff).to.equal(true);
            expect(ev.isOn).to.equal(false);
        })
    })

    it("can be attached to one or several event handlers", function() {
            let ev = new events.Event(), 
                localVar = 0;
 
            ev.onOffActions.push( () => localVar += 1);
            ev.off();
            expect(ev.state).to.equal(events.eventState.off);
            expect(ev.isOff).to.equal(true);
            expect(localVar).to.equal(1);
        })
});


describe("events.Event.flip()", function() {
        it("flips the current state of the event", function() {
            let ev = new events.Event();
            ev.off();
            ev.flip();
            expect(ev.state).to.equal(events.eventState.on);
            ev.flip();
            expect(ev.isOff).to.equal(true);
        })

        it("can be attached to event handlers", function(){
           let ev = new events.Event(), 
               hereVar = 0; 

           ev.onFlipActions.push(() => hereVar += 1);
           ev.flip();
           expect(hereVar).to.equal(1);
        })
})

