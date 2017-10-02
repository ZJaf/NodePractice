//Set up logging
var winston = require('winston');

//Defining general logging
winston.configure({
    transports: [new(winston.transports.Console)({
        level: 'debug',
        timestamp: true,
        colorize: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
    }), new(winston.transports.File)({
        level: 'debug',
        timestamp: true,
        colorize: true,
        maxsize: 10000000,
        maxFiles: 10,
        prettyPrint: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false,
        filename: './logs/main.log'
    })]
});

winston.info("Initializing system...");

// connect to our database
/*
winston.debug("Setting up the database...");
var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.Promise = promise;
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
winston.debug("Database ready!");
*/

winston.debug("Setting up Express server...");
var express = require("express");
var expressApp = express();
winston.debug("Express ready!");

winston.debug("Setting up session management...");
var session = require('client-sessions');
expressApp.use(session({
    cookieName: 'session',
    secret: 'r;sdgmomspgempowrkwopgspoho',
    duration: 1000 * 60 * 180, //Initial session - 1000 (ms) * 60 (s) * 180 (m) = 180 minutes
    activeDuration: 1000 * 60 * 45 //Extend session if Activity - 1000 (ms) * 60 (s) * 45 (m) = 45 minutes
}));
winston.debug("Session management ready");

//Set up communication with the browser
winston.debug("Setting up communications...");
var bodyParser = require('body-parser'); //Support passing data
expressApp.use(bodyParser.json()); //Support JSON data
expressApp.use(bodyParser.urlencoded({ extended: true })); //Support encoding for special characters
expressApp.use(bodyParser.json({ type: 'application/*+json' }));
winston.debug("Communications ready!");

//Set up the UI
winston.debug("Setting up UI...");
expressApp.use(express.static("public")); // Specify the root location of static files (HTML, CSS, etc)
expressApp.set("view engine", "html"); // Specify how the UI will be displayed
winston.debug("UI ready!");

//Register the URL handlers that contain your application code
winston.debug("Setting up URL handlers...");
require('./routes')(expressApp);
winston.debug("URL handlers ready!");

//Start the web server
winston.debug("Starting web server...");
var server = require("http").createServer(expressApp);

server = expressApp.listen(8020, function() {
    winston.info("Example app listening at http://%s:%s", server.address().address, server.address().port)
});