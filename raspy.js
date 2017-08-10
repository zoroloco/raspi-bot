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

      var motion = new five.Motion(8);

      // "calibrated" occurs once, at the beginning of a session,
      motion.on("calibrated", function() {
        log.info("calibrated");
      });

      // "motionstart" events are fired when the "calibrated"
      // proximal area is disrupted, generally by some form of movement
      motion.on("motionstart", function() {
        log.info("motionstart");
        servo1.center();
        servo2.center();
      });

      // "motionend" events are fired following a "motionstart" event
      // when no movement has occurred in X ms
      motion.on("motionend", function() {
        log.info("motionend");
        servo1.to(0);
        servo2.to(0);
      });

      cb();
    });
  },

  rest: function rest(){
    log.info("Going to rest mode.");
    servo1.to(0);
    servo2.to(0);
  },

  center: function center(){
    log.info("Moving raspy center.");
    servo1.center();
    servo2.center();
  },

  down: function down(){
    var x = servo2.position;
    x = x+precision;
    log.info("Moving raspy down to "+x);
    servo2.to(x,interval);
  },

  up: function up(){
    var x = servo2.position;
    x = x - precision;
    log.info("Moving raspy up to "+x);
    servo2.to(x,interval);
  },

  right: function right(){
    var x = servo1.position;
    x = x + precision;
    log.info("Moving raspy right to "+x);
    servo1.to(x,interval);
  },

  left: function left(){
    var x = servo1.position;
    x = x - precision;
    log.info("Moving raspy left to "+x);
    servo1.to(x,interval);
  }

};
