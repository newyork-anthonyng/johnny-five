const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const lcd = new five.LCD({
    pins: ['a2', 'a3', 'a4', 'a5', 'a6', 'a7']
  });

  lcd.cursor(0, 0).print('Hello!');
  lcd.cursor(1, 0).print('01'.repeat(8));
});
