const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const led = new five.Led('b5');
  const spdt = new five.Switch('a5');

  spdt.on('close', () => {
    led.on();
  });
  spdt.on('open', () => {
    led.off();
  });
});
