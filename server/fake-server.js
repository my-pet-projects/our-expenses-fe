const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter({
    '/api/*': '/$1',

    // '/categories/:id': '/categories?id=:id&singular=1',
    // "/categories/:category": "/categories?parent=/:category",
    '/categories': '/categories?parent=/'
});
const config = require('./json-server.json');

const port = config.port;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add custom middleware before JSON Server router
const customMiddleware = require(path.join(__dirname, 'middleware', 'singular.js'));
server.use(customMiddleware);

server.use(function (req, res, next) {
    setTimeout(next, 1000);
});

server.use(rewriter);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
    console.log();
});
