const http = require('http');
const app = require('./app');
const CONFIG = require('./config/config');

const port = parseInt(CONFIG.port, 10) || 3000;
app.set('port', port);

/**
 * Create HTTP server
 */
const server = http.createServer(app);
console.log(`listening to ${port}...`);
server.listen(port);
