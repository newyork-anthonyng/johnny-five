const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const register = new five.ShiftRegister({
    pins: ['a3', 'a5', 'a4'],
    isAnode: true
  });

  let number = 0;

  board.loop(1000, () => {
    register.display(number);
    number++;

    if (number > 9) {
      number = 0;
    }
  });
});
