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
        bad, 
        headers
    }) {
            let callOptions = {
                url: apiCall
            }
            if('headers' in options){
                callOptions.headers = options.headers
            }

            return new Promise((resolve, reject) => {

               if(! validator.isURL(apiCall)){
                 return resolve(options.bad("bad url"))
               } 

               request(callOptions, function(err, response, body) {
                    if (err) return resolve(options.bad(err))

                    if ( response && response.statusCode === 200){
                        return resolve(options.good(body))
                    } 
                    else {
                        return resolve(options.bad('bad response'))
                    }
               })
            })
        }

module.exports= {
    alwaysResolve
}
