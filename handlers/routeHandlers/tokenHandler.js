/*
 * 
 * Title: Token Handler
 * Description: User Handler - To handle token related routes
 * Author: HMWAIO
 * Date: 03.10.2024
 * Time: 
 * 
*/


// dependencies
const data = require("../../lib/data");
const {parseJSON} = require("../../helpers/utilities");
const {hash} = require("../../helpers/utilities");

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if(acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method] (requestProperties, callback);
    } else {
        callback(405);
    }
};



handler._token = {};

// Create
handler._token.post = (requestProperties, callback) => {
    
};

// Read
// @TODO: Authentication
handler._token.get = (requestProperties, callback) => {
    
};

// Update
// @TODO: Authentication
handler._token.put = (requestProperties, callback) => {
    
};

// Delete
// @TODO: Authentication
handler._token.delete = (requestProperties, callback) => {

};



module.exports = handler;