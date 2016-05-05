(function() {



    'use strict';

    // Main router where all routes are called. This is done so the project code is cleaner and more maintainable.
    module.exports = function(server, http) {

        // Route to send landing view
        server.get('/', function(req, res) {
            res.render('index');
        });

        // Route to send login page
        server.get('/login', function(req, res) {
            res.render('index');
        });

        // Route to send register page
        server.get('/register', function(req, res) {
            res.render('index');
        });

        // Route to send package package
        server.get('/package', function(req, res) {
            res.render('index');
        });

        // Route to send package page
        server.get('/package/:id', function(req, res) {
            res.render('index');
        });

        // Route to send packages list page
        server.get('/listpackages', function(req, res) {
            res.render('index');
        });

        // Route to send profile page
        server.get('/profile', function(req, res) {
            res.render('index');
        });

        // Route to send forbidden view
        server.get('/forbidden', function(req, res) {
            res.render('index');
        });

        server.get('/resetPassword/:id', function(req, res) {
            res.render('index');
        });

        // Route to send contact view
        server.get('/contact', function(req, res) {
            res.render('index');
        });

        // Route to send about view
        server.get('/about', function(req, res) {
            res.render('index');
        });


        // Require the routes related to authentication
        require('./authRouter')(server);

        // Require the routes related to packages
        require('./packageRouter')(server);
    };

}());
