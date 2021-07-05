const http = require('http');
const app = require('./app');
const fs = require('fs');

const port = process.env.PORT || 5000;

const httpServer = http.createServer(app).listen(port);
