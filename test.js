var pathUtil = require('path'),
    five     = require("johnny-five"),
    log      = require(pathUtil.join(__dirname,'./logger.js'));

var servo1,servo2;
var precision = 10;
var interval  = 2000;

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

 var motion = new five.Motion(8);

 // "calibrated" occurs once, at the beginning of a session,
 motion.on("calibrated", function() {
   log.info("calibrated");
 });

 // "motionstart" events are fired when the "calibrated"
 // proximal area is disrupted, generally by some form of movement
 motion.on("motionstart", function() {
   log.info("motionstart");
 });

 // "motionend" events are fired following a "motionstart" event
 // when no movement has occurred in X ms
 motion.on("motionend", function() {
   log.info("motionend");
 });

  servo1.sweep();
  servo2.sweep();
});
