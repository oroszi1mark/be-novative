'use strict';

const Hapi = require('hapi');
const apiConfig = require('../config.js').api;

const hapiConfig = {
    debug: { request: ['error'] }
};
const serverConfig = Object.assign({}, hapiConfig, {
    host: apiConfig.host,
    port: apiConfig.port
});
const server = new Hapi.Server(serverConfig);

server.events.on('response', function serverLog(request) {
    console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.url.path} (${request.response.statusCode})`);
});

server.route(require('./api/employee/routes/get_employees'));
server.route(require('./api/employee/routes/get_employee'));
server.route(require('./api/employee/routes/delete_employee'));
server.route(require('./api/employee/routes/post_employee'));
server.route(require('./api/employee/routes/put_employee'));

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