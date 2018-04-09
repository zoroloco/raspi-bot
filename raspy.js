var pathUtil = require('path'),
    log      = require(pathUtil.join(__dirname,'./logger.js')),
    cp       = require('child_process'),
    _        = require('underscore');

var maestro = null;
var cmd     = pathUtil.join(__dirname,"raspibot.py");

var processCommand = function(cmd) {
    log.info("Raspy got command:" + JSON.stringify(cmd));
    if (!_.isEmpty(maestro)) {
        log.warn('Sending command down to stdin of maestro.');
        maestro.stdin.write(cmd);//just send down raw
    }
    else {
        log.error("raspy client cannot send command:" + cmd);
    }
};

var init = function() {
    maestro = cp.spawn('python '+cmd);
    maestro.stdin.setEncoding('utf-8');

    maestro.stdout.on('data', (data) => {
        log.info('raspy received from maestro:'+data);
    });

    maestro.stderr.on('data', (err) => {
        log.error('raspy received stderr from maestro:'+err);
    });

    maestro.on('close', (code) => {
        log.info('raspy process closed with code:'+code);
    });

    maestro.on('exit', (code) => {
        log.info('raspy process exited with code:'+code);
    });
};

module.exports.init = init;
module.exports.processCommand = processCommand;