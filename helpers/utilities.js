/*
 * 
 * Title: Utilities
 * Description: Important utility functions
 * Author: HMWAIO
 * Date: 29.09.2024
 * Time: 
 * 
*/


// dependencies
const crypto = require('crypto');

// module scalffolding
const utilities = {};
const environments = require('./environments');

// parse JSON string to object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};


// hashing
utilities.hash = (str) => {
    if (typeof(str) === "string" && str.length > 0) {
        const hash = crypto
            .createHmac('sha256', environments.secretKey)
            .update(str)
            .digest('hex');
            return hash;
    } else {
        return false;
    }
};


// export module
module.exports = utilities;