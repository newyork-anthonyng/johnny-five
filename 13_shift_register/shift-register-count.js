const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', function() {
  const register = new five.ShiftRegister(['a3', 'a5', 'a4']);
  let output = 0b00000000;
  board.loop(100, () => {
    register.send(output);
    output++;

    if (output > 0b11111111) {
      output = 0b00000000;
    }
  });
});
