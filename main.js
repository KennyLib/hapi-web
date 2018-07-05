const Hapi = require('hapi');
const Path = require('path');

const server = Hapi.server({
    port: 8888,
    host: '0.0.0.0',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'src')
        }
    }
});

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
(async () => {
    await server.register(require('inert'));

    server.route(require('./conf/hapirouter')())

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
})()