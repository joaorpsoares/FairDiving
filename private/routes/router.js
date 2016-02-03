(function() {

    'use strict';

    // Main router where all routes are called. This is done so the project code is cleaner and more maintainable.
    module.exports = function(server, http) {

        // Route to send landing view
        server.get('/', function(req, res) {
            res.render('index');
        });

        // Require the routes related to authentication
        require('./authRouter')(server);

        // Require the routes related to packages
        require('./packageRouter')(server);
    };

}());

