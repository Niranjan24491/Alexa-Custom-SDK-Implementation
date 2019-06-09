"use strict";

const express = require('express');
var app = express();
app.use(express.static('implementation'));

var appjs = require('./implementation/app');

//set paramters as appropriate
var port = '8080';
const config = {
    root: __dirname,
    port: port,
    logLevel: 'INFO',
    logger: null,
	basicAuth: null,
    sslOptions: null
};

// Create an express app instance
var express_app = appjs.init(config);

// Start the server listening..
express_app.listen(port);
