var five  = require("johnny-five"),
    board = new five.Board();

board.on("ready", function() {
  var servo1 = five.Servo(9);
  var servo2 = five.Servo(10);

  servo1.sweep();
  servo2.sweep();
});
