const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const motor = new five.Motor(['a5', 'a4', 'a3']);

  motor.forward(128);
});
