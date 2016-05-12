(function() {

    'use strict';

	// Definition of the routes related with administration.
	module.exports = function(server) {

		server.get('/admin', function(req, res){
			res.render('index');
		});
	};
}());