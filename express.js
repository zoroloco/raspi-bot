//This is my express wrapper object where all the config for the server takes place.

const express  = require('express');
var   pathUtil = require('path'),
      fs       = require('fs'),
      conf     = require(pathUtil.join(__dirname,'./conf.json')),
      log      = require(pathUtil.join(__dirname,'./logger.js')),
bodyParser     = require('body-parser');

module.exports = function(raspibot) {
    var app       = express();

    log.info("Setting default and config values for express app.");

    app.set('port', process.env.PORT || conf.port);
    app.set('httpPort', conf.httpPort);
    app.set('title', conf.title);

    // get all data/stuff of the body (POST) parameters
    // parse application/json
    app.use(bodyParser.json());

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    require('./routes.js')(app,raspibot);

    return app;
};
