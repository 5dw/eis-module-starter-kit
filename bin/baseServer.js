const http = require('http');
const path = require('path');

function BaseServer(addr, port, env) {
    process.env.NODE_ENV = env;

    /**
     * Create the HTTP server with the given address and port
     * require the app script here. (if require at top of this file, it will connect to db before setting the env variable)
     */
    let app = require(path.join(__dirname, '../app'));

    app.logger.info('Set env to "' + env + '"');

    let server = http.createServer(app);

    // hook: onServerCreated(app, server)

    // as the test framework will start the server automatically so ignore the listen call
    if (env !== 'test')
        server.listen(port, addr);

    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
        // hook: onServerError(app, server, error)

        if (error.syscall !== 'listen') {
            throw error;
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                app.logger.error('Have not enough permission to access the database!');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                app.logger.error("The port " + port + " is in use!");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        // hook: onServerStarted(app, server, address, port)

        let address = server.address();
        app.logger.info("Listening on " + address.address + ":" + address.port);
    }

    server.db = app.db;
    return server;
}

module.exports = BaseServer;
