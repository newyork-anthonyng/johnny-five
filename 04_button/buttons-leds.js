const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel()
});

board.on('ready', function() {
  const leds = new five.Leds(['b6', 'b7']);
  const buttons = new five.Buttons(['a6', 'a7']);

  buttons.on('press', button => {
    leds.off();
    leds[buttons.indexOf(button)].on();
  });
});
