var pathUtil = require('path'),
    five     = require("johnny-five"),
    log      = require(pathUtil.join(__dirname,'./logger.js')),
    _        = require('underscore');

var servo1,servo2,s1pos,s2pos;
var precision = 10;

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

      s1pos = 90;
      s2pos = 90;

      log.info("Servos have been initialized.");
      cb();
    });
  },

  center: function center(){
    log.info("Moving raspy center.");
    servo1.center();
    servo2.center();
  },

  left: function left(){
    servo2.position+=precision;
    log.info("Moving raspy left to "+servo2.position);
    servo2.to(servo2.position,2000);
  },

  right: function right(){
    servo2.position-=precision;
    log.info("Moving raspy right to "+servo2.position);
    servo2.to(servo2.position,2000);
  },

  up: function up(){
    servo1.position+=precision;
    log.info("Moving raspy up to "+servo1.position);
    servo1.to(servo1.position,2000);
  },

  down: function down(){
    servo1.position-=precision;
    log.info("Moving raspy down to "+servo1.position);
    servo2.to(servo1.position,2000);
  }

};
