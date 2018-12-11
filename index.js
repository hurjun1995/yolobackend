const app = require("./app");
const http = require("http");
const CONFIG = require("./config/config");

const port = parseInt(CONFIG.port, 10) || 3000;
app.set("port", port);

/**
 * Create HTTP server
 */
const server = http.createServer(app);
server.listen(port);
