/******************************************************************************
 * calendar
 * FranckEinstein
 * ------------------------
 * 
 *  A library to manage calendar events. Defines objects: 
 *   - calendarEvents.Event
 *   - calendarEvents.EventSequence
 *
 ******************************************************************************/
const time      = require('@time/time').time
const dateUtils = require('@time/dateUtils').dateUtils
const events    = require('@src/events').events
/******************************************************************************/

class calendar extends events.Registrar(){

}

module.exports = {
    calendar
}
