//This is my express wrapper object where all the config for the server takes place.

const express          = require('express');
var   pathUtil         = require('path'),
      conf             = require(pathUtil.join(__dirname,'./conf.json')),
      log              = require(pathUtil.join(__dirname,'./logger.js')),
      swaggerUi        = require('swagger-ui-express'),
      swaggerDocument  = require('./swagger.json'),
      bodyParser       = require('body-parser'),
      cors             = require('cors');

module.exports = function(raspybot) {
    var app       = express();

    log.info("Setting default and config values for express app.");

    app.set('port', process.env.PORT || conf.port);
    app.set('title', conf.title);

    // get all data/stuff of the body (POST) parameters
    // parse application/json
    app.use(bodyParser.json());

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    //setup swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    //app.use(cors);

    require('./routes.js')(app,raspybot);

    return app;
};
