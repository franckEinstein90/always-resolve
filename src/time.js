/******************************************************************************
 * The timeSpan module defines several utilites related to time ranges. 
 * It includes:
 *
 *  - A TimeSpan object that abstracts the concept of a length of a span 
 *    between two time markers. 
 *  - A day object that abstracts the concept of a day (date, weekday, holydays)
 *  - A timer
 * 
 *  Last Update 2019/08/06 - FranckEinstein90 
 ******************************************************************************/
"use strict"


/******************************************************************************/
const assert            = require('chai').assert
const moment            = require('moment')
/******************************************************************************/
const TimeSpanProto     = require('./timeSpanProto').TimeSpanProto
/******************************************************************************/


const time = ( function() {

    let _secondSpanMs   = 1000
    let _daySpanMs      = _secondSpanMs * 60 * 60 * 24
    let _monthAfter     = monthAsDate => new Date(monthAsDate.getFullYear(), monthAsDate.getMonth() + 1, 1)

    let _findUnits      = str  => time.units[str] ? time.units[str] : -1

    return {
        isValidDate: date => date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date), 
        units       : {
            seconds     : 5,

            min         : 10, 
            minutes     : 10,

            hours       : 15,
            days        : 20,
            months      : 25,
            years       : 30,
            decades     : 35,
            centuries   : 40
        },

        msSpanLength : { // lengths of time in ms
            day   : _secondSpanMs * 60 * 60 * 24,
            month : (year, monthIdx) =>{
                let day1 = new Date(year, monthIdx, 1);
                return monthAfter(day1).getTime() - day1.getTime()
            }
        }, 

        Span : class extends TimeSpanProto {

                constructor({
                    beginDate, 
                    endDate, 
                    duration, 
                    units 
                    }){
                        super({
                            beginDate: beginDate || '2000-01-01', 
                            endDate :  endDate|| '2000-01-01'
                        })
                        this.units = time.units.days
                        if (units && _findUnits(units) > -1) this.units = _findUnits(units)
                        console.log(this.units)     
                        if( beginDate && endDate && duration &&  units) {

                        } else if (beginDate && endDate) {
                              super({beginDate, endDate})
                              if(this.endDate.isBefore(this.beginDate)) throw time.invalidDateSpan

                        } else if (beginDate && duration){

                        } else if (endDate && duration){

                        } else if ( duration && units ){

                        }

                        }
        }

    }
})()

time.Span.prototype.setUnits = function(units) {
        this.units = units
}

time.Span.prototype.includes =  function(tD) { //returns true if the span includes this date or part of this date

        let targetDate = moment(tD)
        /*************************************************************
         *  input validation
         * ***********************************************************/
        //Only implemented for {timeSpan.units.years, timeSpan.units.months, timeSpan.units.days}
        assert.includeMembers([timeSpan.units.years, timeSpan.units.months, timeSpan.units.days], [this.units], "unsuported time unit");

        if (targetDate.isSameOrBefore(this.endDate, 'year') && targetDate.isSameOrAfter(this.beginDate, 'year')) {
            if (this.units === timeSpan.units.years) {
                return true
            }
            if (targetDate.isSameOrBefore(this.endDate, 'month') && targetDate.isSameOrAfter(this.beginDate, 'month')) {
                if (this.units === timeSpan.units.months) {
                    return true
                }
                if (targetDate.isSameOrBefore(this.endDate, 'day') && targetDate.isSameOrAfter(this.beginDate, 'day')) {
                    if (this.units === timeSpan.units.days) {
                        return true
                    }
                }
            }
        }
        return false
    }




module.exports = {
    time
}

