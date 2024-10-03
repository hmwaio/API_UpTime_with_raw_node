/*
 * 
 * Title: Uptime motitoring application
 * Description: A restful API to monitor up or down time of user defined links
 * Author: HMWAIO
 * Date: 22.09.2024
 * Time: 
 * 
*/


// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const environment = require("./helpers/environments");
const data = require("./lib/data");

// app object - module scaffolding
const app = {};

// testing file system
//@TODO: Erasable
// data.delete("test", "newFile", (err) => {
//     console.log(err);
// });


// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(environment.port, () => {
        console.log(`Listening to port ${environment.port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;


// start the server
app.createServer();