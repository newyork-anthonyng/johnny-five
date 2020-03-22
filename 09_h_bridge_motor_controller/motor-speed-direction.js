const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const spdt = new five.Switch('a2');
  const throttle = new five.Sensor('a7');
  const motor = new five.Motor(['a5', 'a4', 'a3']);

  spdt.on('open', () => {
    motor.stop().forward(motor.speed());
  });

  spdt.on('close', () => {
    motor.stop().reverse(motor.speed());
  });

  throttle.on('change', () => {
    motor.speed(throttle.value >> 2);
  });
});
