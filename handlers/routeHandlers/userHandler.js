/*
 * 
 * Title: User Handler
 * Description: User Handler - To handle user related routes
 * Author: HMWAIO
 * Date: 29.09.2024
 * Time: 
 * 
*/


// dependencies
const data = require("../../lib/data");
const {parseJSON} = require("../../helpers/utilities");
const {hash} = require("../../helpers/utilities");

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if(acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method] (requestProperties, callback);
    } else {
        callback(405);
    }
};



handler._users = {};

// Create
handler._users.post = (requestProperties, callback) => {
    const firstName = typeof(requestProperties.body.firstName) === "string" 
        && requestProperties.body.firstName.trim().length > 0 
        ? requestProperties.body.firstName 
        : false;

    const lastName = typeof(requestProperties.body.lastName) === "string" 
        && requestProperties.body.lastName.trim().length > 0 
        ? requestProperties.body.lastName 
        : false;
    
    const phone = typeof(requestProperties.body.phone) === "string" 
        && requestProperties.body.phone.trim().length === 10 
        ? requestProperties.body.phone 
        : false;

    const password = typeof(requestProperties.body.password) === "string" 
        && requestProperties.body.password.trim().length > 0
        ? requestProperties.body.password 
        : false;

    const tosAgreement = typeof(requestProperties.body.tosAgreement) === "boolean"
        ? requestProperties.body.tosAgreement 
        : false;

    if(firstName && lastName && phone && password && tosAgreement) {
        // make sure that user doesn't already exist
        data.read("users", phone, (err1)=>{
            if(err1) {
                let userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };

                // store the user to DB
                data.create("users", phone, userObject, (err2) => {
                    if(!err2) {
                        callback(200, {
                            'message': "User was created successfully!"
                        });
                    } else {
                        callback(500, {
                            'error': "Could not create user!"
                        });
                    }
                });
            } else {
                callback(500, {
                    error: "There was a problem in server side!"
                });
            }
        });
    } else {
        callback(400, {
            error: "You have a problem in your request"
        });
    };
    
};

// Read
// @TODO: Authentication
handler._users.get = (requestProperties, callback) => {
    // check the phone no is valid
    const phone = typeof(requestProperties.queryStringObject.phone) === "string" 
        && requestProperties.queryStringObject.phone.trim().length === 10 
        ? requestProperties.queryStringObject.phone 
        : false;
    
    if (phone) {
        // lookup the user
        data.read('users', phone, (err, u) => {
            /*
                { name: 'adjf', age: 23, gender: 'male', education: {} }
            */
           // spread operator
            const user = { ...parseJSON(u) };
            if(!err && user) {
                delete user.password;
                callback(200, user);
            } else {
                callback(404, {'error': "Requested user was not found"});
            }
        });
    } else {
        callback(404, {'error': "Requested user was not found"});
    }
};

// Update
// @TODO: Authentication
handler._users.put = (requestProperties, callback) => {
    // check the phone no is valid
    const phone = typeof(requestProperties.body.phone) === "string" 
        && requestProperties.body.phone.trim().length === 10 
        ? requestProperties.body.phone 
        : false;

        const firstName = typeof(requestProperties.body.firstName) === "string" 
        && requestProperties.body.firstName.trim().length > 0 
        ? requestProperties.body.firstName 
        : false;

    const lastName = typeof(requestProperties.body.lastName) === "string" 
        && requestProperties.body.lastName.trim().length > 0 
        ? requestProperties.body.lastName 
        : false;

    const password = typeof(requestProperties.body.password) === "string" 
        && requestProperties.body.password.trim().length > 0
        ? requestProperties.body.password 
        : false;

    if(phone) {
        if(firstName || lastName || password) {
            // lookup the user
            data.read('users', phone, (err1, uData) => {
                const userData = { ... parseJSON(uData) };
                if(!err1 && userData) {
                    if(firstName) {
                        userData.firstName = firstName;
                    }
                    if(lastName) {
                        userData.lastName = lastName;
                    }
                    if(password) {
                        userData.password = hash(password);
                    }

                    // store to db
                    data.update('users', phone, userData, (err2) => {
                        if(!err2) {
                            callback(200, {message: "User was updated successfully"});
                        } else {
                            callback(500, {error: "There was a problem in server side"});
                        }
                    });
                } else {
                    callback(400, {error: "you have a problem in your request"});
                }
            });
        } else {
            callback(400, {error: "You have a problem in your request"});
        }
    } else {
        callback(400, {error: "Invalid phone number. Please try again!"});
    }
};

// Delete
// @TODO: Authentication
handler._users.delete = (requestProperties, callback) => {
    // check the phone no is valid
    const phone = typeof(requestProperties.queryStringObject.phone) === "string" 
        && requestProperties.queryStringObject.phone.trim().length === 10 
        ? requestProperties.queryStringObject.phone 
        : false;

    if(phone) {
        // lookup the user
        data.read('users', phone, (err1, userdata) => {
            if(!err1 && userdata) {
                data.delete('users', phone, (err2) => {
                    if(!err2) {
                        callback(200, {message: "User was successfully deleted"});
                    } else {
                        callback(500, {error: "There was a server side error"});
                    }
                });
            } else {
                callback(500, {error: "There was a server side error"});
            }
        })
    } else {
        callback(400, {error: "There was a problem in your request"});
    }
};



module.exports = handler;