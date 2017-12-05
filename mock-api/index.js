'use strict';

const Hapi = require('hapi');
const apiConfig = require('../config.js').api;

const hapiConfig = {
    debug: { request: 'log' }
};
const serverConfig = Object.assign({}, apiConfig, hapiConfig);
const server = new Hapi.Server(serverConfig);

server.events.on('response', function serverLog(request) {
    console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.url.path} (${request.response.statusCode})`);
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: function helloRoute() {
        return 'Hello world';
    }
});

async function startServer(server) {
    try {
        await server.start();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    
    console.log(`Server running at ${server.info.uri}`);
}

startServer(server);