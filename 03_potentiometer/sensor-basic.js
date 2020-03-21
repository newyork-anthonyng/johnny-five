const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const sensor = new five.Sensor('a7');

  sensor.on('change', () => console.log(sensor.value));
});
