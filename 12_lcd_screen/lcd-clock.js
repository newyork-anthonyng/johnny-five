const moment = require('moment');
const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', function() {
  const lcd = new five.LCD({
    pins: ['a2', 'a3', 'a4', 'a5', 'a6', 'a7']
  });

  let snapshots = ['', ''];

  board.loop(100, () => {
    const updates = [
      moment().format('MMM Do, YYYY'),
      moment().format('hh:mm:ss A')
    ];

    updates.forEach((update, index) => {
      if (snapshots[index] !== update) {
        snapshots[index] = update;
        lcd.cursor(index, 0).print(update);
      }
    });
  });
});
