'use strict';

const   axios = require('axios'),
        Mask = require('generic-bitmask').Mask,
        iconv = require('iconv-lite'),
        Descriptor = require('generic-bitmask').Descriptor,
        utf8 = require('utf8'),
        config = require('./config.js'),
        apiUrl = `http://opengtindb.org/`,
        paramRegex = /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        contentsMask = config.contentsMask,
        errorMessages = config.errors,
        cat1 = config.cat1,
        cat2 = config.cat2;



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
     * @param {arraybuffer} data - The query result as an ArrayBuffer
     * @return {string} data - The decoded Data as UTF-8
     */
    _cleanResponse(data) {
        return iconv.decode(data, 'iso-8859-15');
    }

    /**
     * Gets a product by its EAN
     * @param {string} ean - The EAN
     * @returns {Promise}
     */
    get(ean) {
        ean = ean + '';
        return axios({
            method: 'get',
            url: apiUrl,
            params: {
                queryid: this.apiKey,
                ean: ean,
                cmd: 'query',
            },
            responseType: 'arraybuffer'
        }).then(this.parseResponse.bind(this));
    }

    /**
     * Posts a new product to the API
     * @param {string} ean - The EAN
     * @param {string} name - The generic product name (i.e. "Tea", "Coffee", ...)
     * @param {string} fcat1 - The Main category Title (see config.js)
     * @param {string} fcat2 - The subcategory Title (see config.js)
     * @param {object} options - Optional options: fullname, descr, vendor, contflag (@see: http://opengtindb.org/api.php)
     * @returns {promise}
     */
    set(ean, name, fcat1, fcat2, options = {}) {

        [ean, name, fcat1, fcat2].forEach(param => {
            if(typeof param === 'undefined') {
                return Promise.reject('Please provide all mandatory parameters');
            }
        });

        if(cat1.indexOf(fcat1) < 0) {
            return Promise.reject('Please provide a valid category');
        } else {
            fcat1 = cat1.indexOf(fcat1);
        }

        if(cat2[cat1].indexOf(fcat2) < 0) {
            return Promise.reject('Please provide a valid subcategory');
        } else {
            fcat2 = cat2[cat1].indexOf(fcat2);
        }

        let postOptions = {
            queryid: this.apiKey,
            ean: ean,
            cmd: 'submit',
            name: name,
            fcat1: fcat1+1,
            fcat2: fcat2+1
        };
        Object.assign(postOptions, options);
        return axios({
            method: 'post',
            url: apiUrl,
            data: postOptions,
            responseType : 'arraybuffer'
        }).then(res => {
            return this._cleanResponse(res.data);
        });

    }

    /**
     * Parses the (ascii) opengtindb response and converts it to a JavaScript-Object
     * @param {Object} resp - The Response
     * @returns {Object}
     */
    parseResponse(resp) {
        resp.data = this._cleanResponse(resp.data)
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
