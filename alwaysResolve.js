/**************************************************
 * FranckEinstein90 alwaysResolve 2020
 * ------------------------------------------------
 *  single function library alwaysResolve
 *  see vero repository for documentation on this module
 *  -
 * ***********************************************/
"use strict"
const request = require('request')
const validator = require('validator')

const alwaysResolve = function (apiCall, options = {
        good,
        bad, 
        headers
    }) {
            let bad = (typeof options.bad === 'function')? options.bad : x => options.bad 
            let good = (typeof options.good === 'function')? options.good : x => options.good

            let callOptions = {
                url: apiCall
            }

            if('headers' in options){
                callOptions.headers = options.headers
            }

            return new Promise( resolve  => {

               if(! validator.isURL(apiCall)){
                 return resolve ( bad('bad url') )
               }

               request(callOptions, function(err, response, body) {

                    if (err) {
                        if( typeof options.bad === 'function' ){
                            return resolve( options.bad( err ) )
                        }
                        return resolve( options.bad ) 
                    }

                    if ( response && 'statusCode' in response && response.statusCode === 200){
                        return resolve( good( body ))
                    } 

                    return resolve( bad( response ))
               })
            })
        }

module.exports= {
    alwaysResolve
}
