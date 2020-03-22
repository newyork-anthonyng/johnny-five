const keypress = require('keypress');
const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel(),
  repl: false
});

keypress(process.stdin);

board.on('ready', function() {
  const register = new five.ShiftRegister({
    pins: ['a3', 'a5', 'a4'],
    isAnode: true
  });

  let number = 0;
  register.display(number);

  process.stdin.on('keypress', (character, key) => {
    if (key) {
      if (key.name === 'q') {
        process.exit(0);
      }

      if (key.name === 'up') {
        number++;
      }

      if (key.name === 'down') {
        number--;
      }

      if (number > 9) {
        number = 0;
      }

      if (number < 0) {
        number = 9;
      }
    } else {
      number = character;
    }

    register.display(number);
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

  console.log('Press "q" to quit');
});


