// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
//   }
require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const cors = require('cors');
const server = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('./routes');

const { notFoundHandler, errorLogger, errorHandler } = require('./src/middlewares');

// Middleware
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// ici on appelle les routes du dossier routes
server.use(morgan('dev'));
server.use(routes);

// Gestion des erreurs
server.use('*', notFoundHandler);
server.use(errorLogger);
server.use(errorHandler);

module.exports = server;
