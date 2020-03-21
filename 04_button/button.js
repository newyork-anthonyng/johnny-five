const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const led = new five.Led('a5');
  const button = new five.Button('a2');


  button.on('press', () => {
    led.on();
  });

  button.on('hold', () => {
    led.blink(500);
  });

  button.on('release', () => {
    led.stop().off();
  });
});
