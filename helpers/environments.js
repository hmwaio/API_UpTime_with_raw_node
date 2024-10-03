/*
 * 
 * Title: Environments
 * Description: Handle all environment related things
 * Author: HMWAIO
 * Date: 28.09.2024
 * Time: 
 * 
*/


// dependencies


// module scalffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: "staging",
    secretKey: "adsf@*&0WETadERAiO*093r89u35$GSD#$%&@",
};

environments.production = {
    port: 3000,
    envName: "production",
    secretKey: "7%9sf@*790adsD&RAiO*093r89u35_987fL#$%&@",
};

// determine which environment was passed
const currentEnvironment = typeof(process.env.NODE_ENV) === "string" 
    ? process.env.NODE_ENV 
    : "staging";


// export corresponding environment object
const environmentToExport = typeof(environments[currentEnvironment]) === "object" 
    ? environments[currentEnvironment]
    : environments.staging;


// export module
module.exports = environmentToExport;