(function() {

    'use strict';

    var express = require('express'),
        server = express(),
        morgan = require('morgan'),
        bodyParser = require('body-parser'),
        database = require('./private/database/database');

    // Connect to the database
    database.connect()
        .then(function() {
            console.log('@start.js: Database is connected.');
        })
        .catch(function(err) {
            console.log('@start.js: Database is not connected.');
        });

    server.use(morgan('dev'));

    // Allows the server to read JSON files
    server.use(bodyParser.urlencoded({
        extended: false
    }));
    server.use(bodyParser.json());

    server.get('/', function(req, res) {
        res.send('Hello World!');
    });

    require('./private/routes/router')(server);

    server.listen(3000, function() {
        console.log('Inital configuration went good. Server is running.');
    });

}());
