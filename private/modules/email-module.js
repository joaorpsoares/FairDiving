(function() {

    'use strict';

    var nodemailer = require('nodemailer'),
        email = require('../developer/secrets/email'),
        Promise = require('bluebird'),
        path = require('path'),
        EmailTemplate = require('email-templates').EmailTemplate,
        transporter;

    module.exports = {

        // Function called in the start of the server to connect to the email
        connect: function() {
            return new Promise(function(resolve, reject) {
                transporter = nodemailer.createTransport({
                    service: email.service,
                    auth: {
                        user: email.user,
                        pass: email.password
                    }
                });
                resolve();
            });
        },

        // Function to send a mail to the user. 
        sendWelcome: function(contact, token) {
            return new Promise(function(resolve, reject) {
                var welcomeTemplate = new EmailTemplate(path.join(__dirname, '../resources/emailTemplates', 'welcomeMail'));

                welcomeTemplate.render({
                    code: 'http://localhost:3000/api/confirmation/' + token
                }, function(err, results) {

                    if (err) {
                        reject(err);
                    } else {

                        var mailOptions = {
                            from: email.name,
                            to: contact,
                            subject: "Welcome to FairDiving!",
                            html: results.html,
                            text: results.text
                        };

                        transporter.sendMail(mailOptions, function(err, info) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(contact);
                            }
                        });
                    }
                });
            });
        }
    };
}());
