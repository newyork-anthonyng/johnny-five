const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const register = new five.ShiftRegister({
    pins: {
      clock: 'a5',
      data: 'a3',
      latch: 'a4'
    }
  });

  let output = 0b10000000;

  board.loop(100, () => {
    console.log('looping', output);
    output = output > 0 ? output >> 1 : 0b10000000;
    register.send(output);
  });
});
