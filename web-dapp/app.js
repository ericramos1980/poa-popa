'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('./server-config');

const app = express();

app.use(helmet());

// react front-end
app.use('/', express.static(path.join(__dirname, 'build')));
app.use('/register', express.static(path.join(__dirname, 'build')));
app.use('/confirm', express.static(path.join(__dirname, 'build')));
app.use('/help', express.static(path.join(__dirname, 'build')));
app.use('/my-addresses', express.static(path.join(__dirname, 'build')));
app.use('/add-claim-to-identity', express.static(path.join(__dirname, 'build')));

// api
app.use(bodyParser.urlencoded({ extended: true, limit: config.bodySizeLimit }));
app.use(bodyParser.json({ limit: config.bodySizeLimit }));

const routes = require('./routes')({});
app.use('/api', routes);

module.exports = app;
