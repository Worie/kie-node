'use strict';

require('dotenv').config();

const config = {
    hostname: process.env.NODE_SERVER_HOST || 'localhost',
    port: process.env.NODE_SERVER_PORT || 3000
};

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const server = express();
const routes = require('./server/routes');

const Archiver = require('archiver');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname ,'/dist')));
server.use(routes);

server.listen(config, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});

