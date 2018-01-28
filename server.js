'use strict';

require('dotenv').config();

const config = {
    hostname: process.env.NODE_SERVER_HOST || 'localhost',
    port: process.env.npm_package_config_server_port || 65500
};

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const server = express();
const routes = require('./server/routes');
const serveIndex = require('serve-index');


const Archiver = require('archiver');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(
  '/',
  express.static('./dist'),
  serveIndex(
    './dist',
    {
      'icons': true,
      'template': path.join(__dirname, 'index-template', 'index.html'),
      'stylesheet': undefined
    }
  )
);

server.use(routes);

server.listen(config, () => {
  const url = `http://${config.hostname}:${config.port}/`;
});

