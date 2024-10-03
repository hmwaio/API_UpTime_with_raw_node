/*
 * 
 * Title: Handle
 * Description: Sample Handler
 * Author: HMWAIO
 * Date: 22.09.2024
 * Time: 
 * 
*/


// module
const handler = {

};

handler.sampleHandler = (requestProperties, callback) => {
    callback(200, {
        message: "This is a sample url"
    });
};

module.exports = handler;