const alwaysResolve = require('../src/promises/alwaysResolve').alwaysResolve
const expect = require('chai').expect
const validator = require('validator')


describe('basic use case', function() {

    it('fetches information and brings it back', function(done) {
        //test echo service from postman
        let apiCall = "https://postman-echo.com/get?foo"

        alwaysResolve(apiCall, {
                good: x => JSON.parse(x),
                bad: x => 'notOk'
            })

            .then(answer => {
                expect('args' in answer).to.equal(true)
                return answer.args
            })

            .then(answer => {
                expect('foo' in answer).to.equal(true)
            }).finally(done)
    })

    it('but if there\s a problem, it still resolves', function(done) {

        let bullShitAddress = "ifasf"

        alwaysResolve(bullShitAddress, {
                good: x => x,
                bad: x => x
            })

            .then(answer => {
                expect(answer).to.equal('bad url')
            }).finally(done)
    })

    it('but if there\s a problem, it still resolves', function(done) {

        let bullShitAddress = "https://ppostman-echi.co/get?foo"

        alwaysResolve(bullShitAddress, {
                good: x => x,
                bad: 'notOk'
            })

            .then(answer => {
                expect(answer).to.equal('notOk')
            }).finally(done)
    })

})



describe('good parameter', function() {

    it('takes a "good" parameter', function(done) {

        let apiCall = "https://postman-echo.com/get?foo1=bar1&foo2=bar2"
        alwaysResolve(apiCall, {
                good: 'ok',
                bad: x => 'notOk'
            })
            .then(answer => expect(answer).to.equal('ok'))
            .finally(done)
    })

   it('takes a function labeled as "good" as a parameter', function(done) {

        let apiCall = "https://postman-echo.com/get?foo1=bar1&foo2=bar2"
        alwaysResolve(apiCall, {
                good: x => 'ok',
                bad: x => 'notOk'
            })
            .then(answer => expect(answer).to.equal('ok'))
            .finally(done)
    })

    it('takes the response\'s body as a parameter', function() {
        let apiCall = "https://postman-echo.com/get?foo1=bar1&foo2=bar2"
        alwaysResolve(apiCall, {
                good: x => x,
                bad: x => 'notOk'
            })
            .then(answer => expect(validator.isJSON(answer)).to.equal(true))
    })
})

describe('bad parameter', function() {

    it('it also takes a bad parameter....', function() {
        let apiCall = "https://postman-echo.opm/get?foo1=bar1&foo2=bar2"
        let prom = alwaysResolve("", {
                good: x => x,
                bad: x => 'notOk'
            })
            .then(answer => expect(answer).to.equal('notOk'))
    })

    it('which can be a direct value', function(){
        let apiCall = "https://postman-echo.opm/get?foo1=bar1&foo2=bar2"
        let prom = alwaysResolve("", {
                good: x => x,
                bad: 0 
            })
            .then(answer => expect(answer).to.equal(0))
    })

    it('or a function that takes the return answer as argument', function(done) {
        let apiCall = "https://postman-echo.com/set?foo"
        let prom = alwaysResolve(apiCall, {
                good: x => x,
                bad: x => x
            })
        .then(answer => expect(answer.statusCode).to.equal(404))
       .finally( done )
    })

   it('or a function', function() {
        let apiCall = "https://postman-echo.opm/get?foo1=bar1&foo2=bar2"
        let prom = alwaysResolve("", {
                good: x => x,
                bad: x => x
            })
            .then(answer => expect(answer).to.equal('bad url'))
    })

})

describe('header', function() {
    it('...', function(done) {
        alwaysResolve(
                "https://restcountries-v1.p.rapidapi.com/capital/paris", {
                    good: x => JSON.parse(x),
                    bad: x => x,
                    headers: {
                        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
                        "x-rapidapi-key": "ac56b39f61msh94657a9e072fd89p1ef653jsn631b4d9bc78b"
                    }
                })
            .then(answer => expect(answer[0].name).to.equal('France'))
            .finally(done)

    })
})
