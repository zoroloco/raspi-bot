var five    = require("johnny-five"),
    _       = require('underscore');

var servo1,servo2;

var self = module.exports = {
  init: function init(cb){
    var board = new five.Board();

    board.on("ready", function() {
      servo1 = five.Servo(9);
      servo2 = five.Servo(10);
      cb();
    });
  },

  moveServo1: function moveServo1(pos){
    servo1.to(pos,2000);
  },

  moveServo2: function moveServo2(pos){
    servo2.to(pos,2000);
  }

};
