var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  var leds = new five.Leds(["a5", "a6", "b5"]);
  var index = 0;

  var fader = () => {
    if (index < leds.length) {
      leds[index++].fadeIn(1000, fader);
    }
  };
  fader();
});
