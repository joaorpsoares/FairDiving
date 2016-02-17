(function() {

    'use strict';

    var express = require('express'),
        server = express(),
        morgan = require('morgan'),
        path = require('path'),
        // Request parsing and handling information
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        mld = require('./private/routes/middleware/middleware.js'),
        // Database and email connection information.
        emailModule = require('./private/modules/email-module'),
        database = require('./private/database/database');

    // Connect to the database
    database.connect()
        .then(function() {
            console.log('@start.js: Database is connected.');
        })
        .catch(function(err) {
            console.log('@start.js: Database is not connected.');
        });

    // Connect to email
    emailModule.connect()
        .then(function() {
            // Sending the error to the log file
            console.log('@start.js: Email is connected.');
        })
        .catch(function(err) {
            // Sending the error to the log file
            console.log('@start.js: Email is not connected');
            console.log(err);
        });

    // Logging information on server information
    server.use(morgan('dev', {
        skip: function(req, res) {
            return res.statusCode < 400;
        }
    }));

    // Allows the server to read JSON files
    server.use(bodyParser.urlencoded({
        extended: false
    }));


    // Set up the parsing helpers
    server.use(cookieParser());
    server.use(bodyParser.json());


    // TODO: Not implemented corretly. Do better.
    //server.use(mld.securityLevel);

    // Sets the folder where are the files are static
    server.use(express.static(path.resolve(__dirname, './public/')));

    // Sets the folder where the views are
    server.set('views', path.resolve(__dirname, './public/'));

    // Sets the view engine to EJS
    server.set('view engine', 'ejs');

    require('./private/routes/router')(server);

    server.listen(3000, function() {
        console.log('Inital configuration went good. Server is running.');
    });

}());
