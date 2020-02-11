/*******************************************************************
 * events Module
 * ---------------
 *  events.Event: Include implementations for:
 *
 *  - object events.Event, base class for all other event object in system
 *    . has status on or off
 *    . can be flipped from one to the other
 *    . has a unique id
 *  
 *  - object events.Chain, implements concept of a chain of events
 *    . sets of events that are linked to one another
 *
 *  - object events.Registrar, a container for objects of type events.Event
 *
 *  ------------
 *  Unit tests: /test/events.js
 *  Dependent modules: /src/calendarEvents.js
 * 
 * *****************************************************************/
"use strict"
const uuidv4    = require('uuid/v4')
/******************************************************************************/
const events = (function() {


    let eventRegistrar = new Map()

    return {
        on          : 1,
        off         : 0,  

        states      : {
            off : 0, 
            on  : 1
        }, 

        eventState  : {
            on: 1,
            off: 0
        },

        /*************************************************************
         *  base event abstraction. A wrapper for:  
         *   - a unique id
         *   - a status of on or off
         *
         * **********************************************************/
        Event: function({
            state
        }) { // events.Event registered at construction

            this.id             = uuidv4()
            this.onOffActions   = []
            this.onOnActions    = []
            this.onFlipActions  = []

            if (state === undefined) {
                this.state = events.eventState.on;
            } else {
                this.state = state;
            }

            eventRegistrar.set(this.id, this.state);
        },

        /*************************************************************
         * events.Chain
         * -------------------
         *  Structure that links events to each other
         *  provides facilities to create webs of related 
         *  events
         * **********************************************************/
        Chain: function() {
            //todo
        },

        /*************************************************************
         * events.Registrar
         * -------------------
         *  Structure into which events can be registered. Provides
         *  various operations on the set of registered events, map, 
         *  filter, reduce
         * **********************************************************/

        Registrar: function() { // Event registrar
            this.events = new Map();
        },

        /*************************************************************
         * events.Exception
         * -------------------
         *  Error Structure 
         * **********************************************************/
        Exception: function(err) {

        }
    }
})()


/******************************************************************************
 * Event class prototype
 * 
 * ***************************************************************************/

events.Event.prototype = {

    get isOn() {
        return (this.state == events.eventState.on);
    },

    get isOff() {
        return (this.state === events.eventState.off);
    },

    on: function() { //event is ongoing
        if (this.isOff) {
            this.state = events.eventState.on;
            this.onOnActions.forEach(x => x());
        }
    },

    off: function() { //event is offgoing
        if (this.isOn) {
            this.state = events.eventState.off;
            this.onOffActions.forEach(x => x());
        }
    },


    flip: function() {
        if (this.isOn) {
            this.off();
        } else {
            this.on();
        }
        this.onFlipActions.forEach(x => x());
    }
};


module.exports = {
    events
}
