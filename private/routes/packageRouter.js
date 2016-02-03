(function() {

    'use strict';

    var database = require('../database/database'),
        validator = require('validator');

    // Definition of the routes related with packages.
    module.exports = function(server) {

        // TODO: VERIFY COOKIE

        // Route to insert a new package
        server.post('/api/package', function(req, res) {});
    };

}());

