/**************************************************
 * FranckEinstein90 alwaysResolve 2020
 * ***********************************************/
"use strict"
const request = require('request')
const alwaysResolve = function (apiCall, {
            test, 
            good,
            bad
        }) {
            if(test){
               apiCall = "https://postman-echo.com/get?foo1=bar1&foo2=bar2"
               good = x => 'ok'
               bad = x => 'NotOk'
            }
            
            return new Promise((resolve, reject) => {
                request(apiCall, function(err, response, body) {
                    if (err) return resolve(bad)
                    if (response && response.statusCode === 200 && response.statusMessage === "OK") {
                        resolve(good(body))
                    } else {
                        return resolve(bad)
                    }
                })
            })
        }

module.exports= {
    alwaysResolve
}
