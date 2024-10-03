/*
 * 
 * Title: Routes
 * Description: Application routes
 * Author: HMWAIO
 * Date: 22.09.2024
 * Time: 
 * 
*/



const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler');
const {userHandler} = require('./handlers/routeHandlers/userHandler');
const {tokenHandler} = require('./handlers/routeHandlers/tokenHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler,
};

module.exports = routes;