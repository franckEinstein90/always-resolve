/*****************************************************************************
 *
 *
 * ***************************************************************************/
"use strict" 

/*****************************************************************************/
require('module-alias/register')
/*****************************************************************************/
const clock             = require('@src/clock').clock
const events            = require('@events/events').events
const CalendarEvent     = require('@src/events/calendarEvent').CalendarEvent
const time              = require('@src/time').time
/*****************************************************************************/

let recurringEvent  = new events.Event({
        state: events.states.off
})

recurringEvent.repeat = {
    span:   new time.Span({
        duration: 1, 
        units   : 'min'
    })
}

let c = new clock.Clock({
        cout: x => console.log(x), 
        events: [recurringEvent]
    })
c.start()


