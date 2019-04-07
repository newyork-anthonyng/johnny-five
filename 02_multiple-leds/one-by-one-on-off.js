const five = require("johnny-five");
const Tessel = require("tessel-io");
const board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  const leds = new five.Leds(["a2", "a3", "a4", "a5", "a6", "a7"]);
  let index = 0;
  let step = 1;

  board.loop(100, () => {
    leds.off().slice(0, index).on();
    index += step;
    if (index === 0 || index === leds.length) {
      step *= -1;
    }
  });
});
