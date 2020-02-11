/******************************************************************************
 *
 ******************************************************************************/
"use strict"


/******************************************************************************/
const moment = require('moment')
/******************************************************************************/

class TimeSpanProto {
    constructor({
        beginDate, 
        endDate
    }){
        try {

            this.beginDate  = moment(beginDate)
            this.endDate    = moment(endDate)

        } catch (e) {
            throw "unable to create TimeSpanProto" + e
        }
    }
}

module.exports = {
    TimeSpanProto
}
