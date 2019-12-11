const alwaysResolve = require('../alwaysResolve').alwaysResolve
const expect = require('chai').expect

describe('....', function(){
	it('i...' , function(){
        let prom = alwaysResolve("", {test:true})
        .then(answer => expect(answer).to.equal('ok'))
	})
})
