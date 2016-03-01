(function() {

    'use strict';

    var jwt = require('../../modules/token-module'),
        routes = require('./routes.json');

    var self = module.exports = {

        securityLevel: function(req, res, next) {

            if (Object.keys(req.cookies).length !== 0) {
                jwt.verifySession(req.cookies.session)
                    .then(function(result) {

                        var _isRequestAllowed = self.inAllowedRoutes(result, req.url);

                        if (_isRequestAllowed) {
                            next();
                        } else {
                            res.redirect('/forbidden');
                        }
                    })
                    .catch(function(err) {
                        res.status(406).send('Not allowed for you');
                    });
            } else {

                // No cookie at all
                var _isRequestAllowed = self.inAllowedRoutes("GUEST", req.url);

                if (_isRequestAllowed) {
                    next();
                } else {
                    res.redirect('/forbidden');

                }
            }
        },

        // Function to get all routes allowed for each role.
        getAllRoutesByRole: function(role) {

            var _allowedRoutes = [],
                _apiRoutes = routes.API,
                _viewsRoutes = routes.VIEWS;

            if (role === "ADMIN") {
                _allowedRoutes = _allowedRoutes
                    .concat(_apiRoutes.ADMIN)
                    .concat(_apiRoutes.MEMBER)
                    .concat(_apiRoutes.OPERATOR)
                    .concat(_viewsRoutes.ADMIN)
                    .concat(_viewsRoutes.MEMBER)
                    .concat(_viewsRoutes.OPERATOR);
            } else if (role === "OPERATOR") {
                _allowedRoutes = _allowedRoutes
                    .concat(_apiRoutes.OPERATOR)
                    .concat(_apiRoutes.MEMBER)
                    .concat(_viewsRoutes.OPERATOR)
                    .concat(_viewsRoutes.MEMBER);
            } else if (role === "MEMBER") {
                _allowedRoutes = _allowedRoutes
                    .concat(_apiRoutes.MEMBER)
                    .concat(_viewsRoutes.MEMBER);
            } else {
                _allowedRoutes = _allowedRoutes
                    .concat(_apiRoutes.GUEST)
                    .concat(_viewsRoutes.GUEST);
            }

            return _allowedRoutes;
        },


        // Function to check if a certain URL is in an array of allowed routes
        inAllowedRoutes: function(role, url) {
            console.log(url);
            var _allowedRoutes = self.getAllRoutesByRole(role),
                _currentURLallowed = false;

            for (var i = 0; i < _allowedRoutes.length; i++) {
                console.log(_allowedRoutes[i], "-->" + url);
                if (_allowedRoutes[i].indexOf(url) !== -1) {
                    _currentURLallowed = true;
                    break;
                } else continue;
            }

            return _currentURLallowed;
        }
    };

}());
