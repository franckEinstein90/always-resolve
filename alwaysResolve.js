/**************************************************
 * FranckEinstein90 alwaysResolve 2020
 * ------------------------------------------------
 *  single function library alwaysResolve
 *
 *  When I use Promises.all for rest API calls, 
 *  I keep on bumping into use cases
 *  in which i need the promise to resolve 
 *  no matter what, because the flow depends on it
 *
 * ***********************************************/
"use strict"
const request = require('request')
const validator = require('validator')

const alwaysResolve = function (apiCall, options = {
        good,
        bad
    }) {
            return new Promise((resolve, reject) => {
               if(! validator.isURL(apiCall)){
                 return resolve(options.bad("bad url"))
               } 

               request(apiCall, function(err, response, body) {
                    if (err) return resolve(options.bad(err))
                    if (response && response.statusCode === 200 && response.statusMessage === "OK") {
                        resolve(options.good(body))
                    } else {
                        return resolve(options.bad)
                    }
               })
            })
        }

module.exports= {
    alwaysResolve
}
