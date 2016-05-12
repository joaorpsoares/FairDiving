(function() {

    'use strict';

    var database = require('../database/database'),
        validator = require('validator'),
        crypto = require('crypto'),
        email = require('../modules/email-module'),
        bcrypt = require('bcrypt-nodejs'),
        token = require('../modules/token-module'),
        mdl = require('./middleware/middleware'),
        Transaction = require('pg-transaction');


    // Definition of the routes related with authentication.
    module.exports = function(server) {

        // TODO: INSERT DEFAULT ROLE

        // Route to register a user
        server.post('/api/register', function(req, res) {
            if (!validator.matches(req.body.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)) {
                res.status(406).send('Your password needs to have at least one capital letter, one lowercase letter, one number and a length of 6 or more.');
            } else if (req.body.password !== req.body.confirmPassword) {
                res.status(406).send('Your passwords are different.');
            } else {
                if (validator.isEmail(req.body.email)) {
                    if (!validator.matches(req.body.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/))
                        res.status(406).send('Your password needs to have at least one capital letter, one lowercase letter, one number and a length of 6 or more.');
                    else {
                        database.checkExistence(req.body.email.toLowerCase())
                            .then(function() {
                                crypto.randomBytes(32, function(err, buf) {
                                    if (err) {
                                        res.status(406).send(err);
                                    } else {
                                        bcrypt.hash(req.body.password, null, null, function(err, hash) {

                                            if (err) {
                                                res.status(406).send(err);
                                            } else {

                                                var user = [req.body.email.toLowerCase(), hash, buf.toString('hex')];

                                                var __transaction = new Transaction(database.getClient());

                                                __transaction.on('error', function(err) {
                                                    if (err) throw err;
                                                });
                                                __transaction.begin();
                                                __transaction.savepoint('_beforeInsertUser');

                                                database.insertNewUser(user)
                                                    .then(function(usrID) {
                                                        database.insertUsrLevel(usrID)
                                                            .then(function() {
                                                                __transaction.commit();
                                                                email.sendWelcome(req.body.email, buf.toString('hex'))
                                                                    .then(function(contact) {
                                                                        // Send the message to the log file
                                                                        console.log('@authRouter.js: Welcome e-mail sent to ' + contact);
                                                                        res.status(200).send('OK');
                                                                    })
                                                                    .catch(function(err) {
                                                                        console.log('@authRouter.js: Welcome e-mail not sent.');
                                                                        res.status(200).send(err);
                                                                    });
                                                            })
                                                            .catch(function(err) {
                                                                __transaction.rollback('_beforeInsertUser');
                                                                res.status(406).send(err);
                                                            });
                                                    })
                                                    .catch(function(err) {
                                                        res.status(406).send(err);
                                                    });
                                            }
                                        });
                                    }
                                });
                            })
                            .catch(function() {
                                res.status(406).send('This email is already in our database.');
                            });
                    }
                } else {
                    res.status(400).send('The email that was given is not valid.');
                }
            }
        });

        // Route to verify the login
        server.post('/api/login', function(req, res) {
            if (validator.isEmail(req.body.email)) {
                database.getSensitiveData(req.body.email)
                    .then(function(result) {
                        if (result.length > 0) {
                            if (!result[0].active) res.status(406).send('You need to complete the registration before login. Check you email.');
                            else {
                                bcrypt.compare(req.body.password, result[0].password, function(err, _result) {
                                    if (err) {
                                        res.status(406).send('Password and email didn\'t match.');
                                    } else {
                                        if (_result) {
                                            token.sign(result[0].token)
                                                .then(function(token) {
                                                    res.status(200).send(token);
                                                }).catch(function() {
                                                    res.status(400).send('We could not generate a token for this session.');
                                                });
                                        } else {
                                            res.status(406).send('Email or password not correct.');
                                        }
                                    }
                                });
                            }
                        } else {
                            res.status(406).send('Email is not known.');
                        }
                    })
                    .catch(function(err) {
                        res.status(406).send(err);
                    });
            } else {
                res.status(406).send('Sorry! Please enter an email address.');
            }
        });

        // Route to check token
        server.get('/api/confirmation/:id', function(req, res) {

            database.updateActiveAttribute(req.params.id)
                .then(function() {
                    res.render('index');
                })
                .catch(function() {
                    res.render('index');
                });
        });

        // Route to retrieve user by cookie session
        server.get('/api/user', function(req, res) {
            token.verifySession(req.cookies.session)
                .then(function(userInfo) {
                    res.status(200).send(userInfo.token);
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(406).send(err);
                });
        });

        // Route to retrieve user by token
        server.get('/api/user/:token', function(req, res) {
            token.verifySession(req.cookies.session)
                .then(function() {
                    database.retrieveUsrByToken(req.params.token)
                        .then(function(user) {
                            res.status(200).send(user);
                        })
                        .catch(function(err) {
                            console.log(err);
                            res.status(406).send('err');
                        });
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(406).send('err');
                });
        });

        // Route to retrieve user by cookie session
        server.post('/api/updateUser', function(req, res) {
            token.verifySession(req.cookies.session)
                .then(function(info) {
                    database.retrieveUsrIDByToken(info.token)
                        .then(function(userID) {
                            database.retrieveUsrById(userID)
                                .then(function(user) {
                                    var __user = {
                                        id: userID
                                    };

                                    req.body.name === undefined || req.body.name === '' ? __user.name = user[0].name : __user.name = req.body.name;

                                    req.body.email === undefined || req.body.email === '' ? __user.email = user[0].email : __user.email = req.body.email;

                                    req.body.telephone === undefined || req.body.telephone === '' ? __user.telephone = user[0].telephone : __user.telephone = req.body.telephone;

                                    req.body.birthdate === undefined || req.body.birthdate === '' ? __user.birthdate = user[0].birthdate : __user.birthdate = req.body.birthdate;

                                    req.body.shopname === undefined || req.body.shopname === '' ? __user.shopname = user[0].shopname : __user.shopname = req.body.shopname;

                                    req.body.websitelink === undefined || req.body.websitelink === '' ? __user.websitelink = user[0].websitelink : __user.websitelink = req.body.websitelink;

                                    req.body.address === undefined || req.body.address === '' ? __user.address = user[0].address : __user.address = req.body.address;

                                    req.body.zipcode === undefined || req.body.zipcode === '' ? __user.zipcode = user[0].zipcode : __user.zipcode = req.body.zipcode;

                                    req.body.country === undefined || req.body.country === '' ? __user.country = user[0].country : __user.country = req.body.country;

                                    database.updateUsrByID(__user)
                                        .then(function(updatedUser) {
                                            res.status(200).send(updatedUser);
                                        })
                                        .catch(function() {
                                            res.status(406).send(err);
                                        });

                                })
                                .catch(function(err) {
                                    res.status(406).send(err);
                                });

                        })
                        .catch(function() {
                            res.status(406).send('Some error happened on our side. Try again later please.');
                        });
                })
                .catch(function() {
                    res.status(401).send('Do you have permission to do that?!');
                });
        });

        // Route to update password
        server.post('/api/user/changePassword', function(req, res) {

            token.verifySession(req.cookies.session)
                .then(function(info) {
                    database.retrieveUsrByToken(info.token)
                        .then(function(userID) {
                            database.getSensitiveData(userID[0].email)
                                .then(function(user) {
                                    if (req.body.newpassword !== req.body.confirmpassword) {
                                        res.status(406).send("New password and its confirmation dont match");
                                    } else {
                                        bcrypt.compare(req.body.oldpassword, user[0].password, function(err, _result) {
                                            if (err) {
                                                res.status(406).send('You wrote the wrong old password.');
                                            } else {
                                                if (_result) {
                                                    bcrypt.hash(req.body.newpassword, null, null, function (err, hash) {
                                                        if (err) {
                                                            res.status(406).send('There was a problem with hashing your password.');
                                                        } else {
                                                            database.updatePassword(hash, userID[0].email)
                                                                .then(function () {
                                                                    res.status(200).send("Your password was changed");
                                                                })
                                                                .catch(function () {
                                                                    res.status(406).send('It was impossible to change the password.');
                                                                });
                                                        }
                                                    });
                                                } else {
                                                    res.status(406).send("The \'current password\' sent do not match with the current one.");
                                                }
                                            }
                                        });
                                    }
                                })
                                .catch(function(err) {
                                    res.status(500).send("An error occurred on server. Try again later.");
                                });
                        })
                        .catch(function(err) {
                            res.status(406).send('Some error happened on our side. Try again later please.');
                        });
                })
                .catch(function(err) {
                    res.status(401).send('Do you have permission to do that?!');
                });
        });

        // Route to send a confirmation email to change password
        server.post('/api/user/recover', function(req, res) {

            if (validator.isEmail(req.body.email)) {
                database.checkEmailExistance(req.body.email)
                    .then(function() {
                        database.getSensitiveData(req.body.email)
                            .then(function(_userData) {
                                email.sendRecover(req.body.email, _userData[0].token)
                                    .then(function() {
                                        console.log('@authRouter.js : Recover email was sent.');
                                        res.status(200).send('OK');
                                    })
                                    .catch(function(err) {
                                        console.log('@authRouter.js : Recover email was not sent.');
                                        res.status(200).send('OK');
                                    });
                            })
                            .catch(function(err) {
                                res.status(500).send("Oh well... There was a problem with us.");
                            });
                    })
                    .catch(function(err) {
                        console.log(err);
                        res.status(406).send("We do not recognize this email.");
                    });
            } else {
                res.status(406).send("Email given is not valid.");
            }
        });

        // Route to send a new password to a email
        server.post('/api/user/recover/confirmed/', function(req, res) {

            var user = {
                password: req.body.password,
                passwordconfirm: req.body.passwordconfirm,
                email: req.body.email,
                token: req.body.token
            };

            if (validator.isEmail(user.email) && user.password === user.passwordconfirm) {
                database.checkEmailExistance(user.email)
                    .then(function() {
                        database.getSensitiveData(user.email)
                            .then(function(result) {
                                if (result[0].token === user.token) {
                                    bcrypt.hash(req.body.password, null, null, function(err, hash) {
                                        if (err) {
                                            res.status(406).send('WARNING: There was a problem with hashing your password.');
                                        } else {
                                            database.updatePassword(hash, user.email)
                                                .then(function() {
                                                    crypto.randomBytes(32, function(err, buf) {
                                                        if (err) {
                                                            res.status(406).send(err);
                                                        } else {
                                                            database.refreshToken(buf.toString('hex'), req.body.email)
                                                                .then(function() {
                                                                    res.status(200).send("ALL GOOD : Password was changed.");
                                                                })
                                                                .catch(function(err) {
                                                                    res.status(200).send("ALL GOOD : Password was changed.");
                                                                    // TODO: CREATE ADMIN LOG SAYNG TOKEN WAS NOT CHANGED
                                                                });
                                                        }
                                                    });
                                                })
                                                .catch(function() {
                                                    res.status(406).send('WARNING : It was impossible to change the password.');
                                                });
                                        }
                                    });
                                } else {
                                    res.status(406).send('WARNING: Token is not valid. Ask again for your password.');
                                }
                            })
                            .catch(function() {
                                res.status(406).send("WARNING: This token is not valid anymore.");
                            });
                    })
                    .catch(function() {
                        res.status(406).send("WARNING: This email is not recognized by our system. Did you change the url?");
                    });
            } else {
                res.status(406).send("WARNING: Email is not valid or passwords dont match.");
            }
        });

        // Route to send email
        server.post('/api/email/sendEmail', function(req, res){
            if (validator.isEmail(req.body.email)){
                email.sendContactForm(req.body)
                    .then(function(){
                        res.status(200).send('OK');
                    })
                    .catch(function(err){
                        console.log('@authRouter.js : Form was not sent.');
                        console.log(err);
                        res.status(406).send("Something went wrong!");
                    });
            }
        });
    };

}());