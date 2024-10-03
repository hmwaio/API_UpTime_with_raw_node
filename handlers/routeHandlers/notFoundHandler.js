/*
 * 
 * Title: Not Found Handler
 * Description: 404 Not Found Handler
 * Author: HMWAIO
 * Date: 22.09.2024
 * Time: 
 * 
*/


// module
const handler = {

};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: "Your requested url is not found"
    });
};

module.exports = handler;