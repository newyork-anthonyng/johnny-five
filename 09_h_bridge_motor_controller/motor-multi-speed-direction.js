const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', function() {
  const spdt = new five.Switch('a2');
  const throttle = new five.Sensor('a7');
  const motors = new five.Motors([
    ['a5', 'a4', 'a3'],
    ['b5', 'b4', 'b3'],
  ]);
  let speed = 0;
  spdt.on('open', () => {
    motors.stop().forward(speed);
  });
  spdt.on('close', () => {
    motors.stop().reverse(speed);
  });

  throttle.on('change', () => {
    speed = throttle.value >> 2;
    motors.speed(speed);
  });
});
