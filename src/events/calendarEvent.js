/******************************************************************************
 * calendarEvents namespace 
 * FranckEinstein
 * ------------------------
 * 
 *  A library to manage calendar events. Defines objects: 
 *   - calendarEvents.Event
 *   - calendarEvents.EventSequence
 *
 ******************************************************************************/
const time      = require('@src/time').time
const dateUtils = require('@src/dateUtils').dateUtils
const events    = require('@events/events').events
/******************************************************************************/

/******************************************************************
 *  A calendar event is an event with the following additional properties:
 *
 *  - A begin date (beginDate)
 *  - An end date  (endDate)
 *  - A title (at most 255 chars)
 *  - A description (at most 510 chars)
 ***********************************************************************/


class calendarEvent extends events.Event {
    constructor({
        beginDate, 
        endDate,    
        title, 
        description
    }){
        super()
        try {
            this.timeSpan = new time.Span({
                beginDate, 
                endDate,
                units: time.units.days
           })

            } catch (err ){
                console.log(err)
            }
    }
}

module.exports = {
    calendarEvent
}
