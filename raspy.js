var pathUtil = require('path'),
    five     = require("johnny-five"),
    log      = require(pathUtil.join(__dirname,'./logger.js')),
    _        = require('underscore');

var servo1,servo2;
var precision = 10;
var interval  = 2000;

var self = module.exports = {

  init: function init(cb){
    var board = new five.Board();

    board.on("ready", function() {
      servo1 = five.Servo({
        pin: 9,
        center: true,
        range: [0, 180]
      });

      servo2 = five.Servo({
        pin: 10,
        center: true,
        range: [0,180]
      });

      log.info("Servos have been initialized.");
      cb();
    });
  },

  center: function center(){
    log.info("Moving raspy center.");
    servo1.center();
    servo2.center();
  },

  right: function right(){
    log.info("Moving raspy left to "+servo2.position+precision);
    servo2.to(servo2.position+precision,interval);
  },

  left: function left(){
    log.info("Moving raspy right to "+servo2.position-precision);
    servo2.to(servo2.position-precision,interval);
  },

  up: function up(){
    log.info("Moving raspy up to "+servo1.position+precision);
    servo1.to(servo1.position-precision,interval);
  },

  down: function down(){
    log.info("Moving raspy down to "+servo1.position-precision);
    servo1.to(servo1.position-precision,interval);
  }

};
