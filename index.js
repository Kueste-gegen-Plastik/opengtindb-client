'use strict';

const   axios = require('axios'),
        Mask = require('generic-bitmask').Mask,
        Descriptor = require('generic-bitmask').Descriptor,
        apiUrl = `http://opengtindb.org/`,
        paramRegex = /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/, 
        contentsMask = {
            'lactose_free' : 1,  // (binär 000000000001) - laktosefrei
            'caffeine_free' : 2,  // (binär 000000000010) - koffeeinfrei
            'diet_food' : 4, //(binär 000000000100) - diätetisches Lebensmittel
            'gluten_free' : 8, //(binär 000000001000) - glutenfrei
            'fructose_free' : 16, // (binär 000000010000) - fruktosefrei
            'organic_food' : 32, // (binär 000000100000) - BIO-Lebensmittel nach EU-Ökoverordnung
            'fairtrade' : 64, // (binär 000001000000) - fair gehandeltes Produkt nach FAIRTRADE™-Standard
            'vegetarian' : 128, // (binär 000010000000) - vegetarisch
            'vegan' : 256, //(binär 000100000000) - vegan
            'microplastic' : 512, //(binär 001000000000) - Warnung vor Mikroplastik
            'mineral_oil_warning' :  1024, // (binär 010000000000) - Warnung vor Mineralöl
            'nicotine_warning' :  2048  // (binär 100000000000) - Warnung vor Nikotin
        }
/**
 * Class to do query the OpenGtinDB API
 */
class OpenGtinDB {

    /**
     * Create a OpenGtinDB-Client instance
     * @param {string} apiKey - The API key.
     * @param {Object} [contentsMask] - The Bitmask-Descriptor for the "contents" of a product as described at: http://opengtindb.org/api.php
     * @return {Object} the OpenGtinDB-Client instance
     * @throws {Error} 
     */
    constructor(apiKey, mask) {
        if(typeof apiKey !== 'string') throw new Error('Please provide the userID as a String');
        this.apiKey = apiKey;
        this.contentsMask = mask || contentsMask;
        this.Descriptor = new Descriptor(this.contentsMask);
        return this;
    }

    /**
     * Gets a product by its EAN
     * @param {string} ean 
     * @returns {Promise} 
     */
    get(ean) {
        ean = ean + '';
        return axios.get(apiUrl,{
            params: {
                queryid: this.apiKey,
                ean: ean,
                cmd: 'query'
            },
            responseType : 'text'
        }).then(this.parseResponse.bind(this));
    }

    /**
     * Posts a new product to the API
     * @param {string} ean 
     * @returns {promise} 
     */
    setEan(ean, name, fcat1, fcat2, options = {}) {
        let postOptions = {
            queryid: this.apiKey,
            ean: ean,
            cmd: 'submit',
            name: name,
            fcat1: fcat1,
            fcat2: fcat2
        };
        Object.assign(postOptions, options, {
            responseType : 'text'
        });
        return axios.post(apiUrl, postOptions).then(this.parseResponse.bind(this));
    }

    /**
     * Parses the (ascii) opengtindb response and converts it to a JavaScript-Object
     * @param {Object} resp - The Response
     * @returns {Object}
     */
    parseResponse(resp) {
	    let lines = resp.data.split(/\r\n|\r|\n/), 
            cnt = -1,
            retVal = {
                error : true,
                data : []
            };
        lines.forEach(line => {
            // check if it's a param
            if(paramRegex.test(line)) {
                let match = line.match(paramRegex),
                    currentProduct = retVal.data[cnt];
                if(match[1] == 'error') {
                    // set the error-state
                    retVal.error = match[2];
                } else if(match[1] == 'contents') {
                    // read the contents from the bitmask
                    currentProduct['contents'] = this.Descriptor.extract(new Mask(match[2] + ''));
                } else {
                    retVal.data[cnt][match[1]] = match[2];
                }
            } else {
                // add a new product
                if(line.indexOf('---') === 0) {
                    cnt++;
                    retVal.data[cnt] = {};
                }
            }
        });
        return retVal;
    }


}

module.exports = OpenGtinDB;