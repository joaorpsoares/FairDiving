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
                    code: 'http://52.37.66.121:3000/api/confirmation/' + token,
                    contact: contact

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
        },

        // Function to send a recover email to the user
        sendRecover: function(contact, token) {
            return new Promise(function(resolve, reject) {
                var recoverMail = new EmailTemplate(path.join(__dirname, '../resources/emailTemplates', 'recoverMail'));

                recoverMail.render({
                    code: 'http://52.37.66.121:3000/resetPassword/' + encodeURIComponent(contact) + '+' + token
                }, function(err, results) {

                    if (err) {
                        reject(err);
                    } else {

                        var mailOptions = {
                            from: email.name,
                            to: contact,
                            subject: "Recover your password at fairdiving.",
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
        },

        // Function to send a new password
        sendPassword: function(contact, password) {
            return new Promise(function(resolve, reject) {
                var recoverMail = new EmailTemplate(path.join(__dirname, '../resources/emailTemplates', 'sendPassword'));

                recoverMail.render({
                    password: password
                }, function(err, results) {

                    if (err) {
                        reject(err);
                    } else {

                        var mailOptions = {
                            from: email.name,
                            to: contact,
                            subject: "Here it is.. your new password at fairdiving.",
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
        },

        // Function to send the contact form
        sendContactForm: function(data){
            return new Promise(function(resolve, reject) {

                var formEmail = new EmailTemplate(path.join(__dirname, '../resources/emailTemplates', 'formMail'));

                formMail.render({
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    text: data.text
                }, function(err, results){
                    if (err) {
                        reject(err);
                    } else {

                        var mailOptions = {
                            from: email.name,
                            to: data.email + ',' + email.name,
                            subject: "[Contact] We received a message from you.",
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
