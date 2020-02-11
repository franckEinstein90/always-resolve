/*******************************************************************
 * unit tests for events namespace objects and functions
 * FranckEinstein90
 ********************************************************************/

const expect        = require('chai').expect
const validator     = require('validator')
const TimeSpanProto = require('../src/timeSpanProto').TimeSpanProto

describe('TimeSpanProto Object', function() {

    it("is created using a start and end date", function() {
        let ev = new TimeSpanProto({
            beginDate   : '2013-03-04', 
            endDate     : '2014-01-01'
        })
        expect(ev).to.not.be.undefined;
    })

    describe('TimeSpanProto.constructor', function() {
        it('is created using two dates', function() {
            let April24_2010 = new Date(2010, 03, 24)
            let April27_2010 = new Date(2010, 03, 27)
            let ts = new TimeSpanProto(April24_2010, April27_2010 )

            expect(ts).to.have.property('beginDate');
            expect(ts).to.have.property('endDate');
        })

   })

}) 
