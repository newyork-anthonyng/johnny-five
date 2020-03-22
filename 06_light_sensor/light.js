const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const light = new five.Light('a7');

  light.on('change', () => {
    console.log(light.level);
  });
});
