const http = require('http');
const app = require('./app');
const CONFIG = require('./config/myConfig');

const port = parseInt(CONFIG.port, 10);
app.set('port', port);

/**
 * Create HTTP server
 */
const server = http.createServer(app);
console.log(`Listening on ${port}...`);
server.listen(port);
