const iss = require('iss');
const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', function() {
  const lcd = new five.LCD(['a2', 'a3', 'a4', 'a5', 'a6', 'a7']);

  iss.locationStream(25544, 20).on('data', buffer => {
    const data = JSON.parse(buffer.toString());

    lcd.cursor(0, 0).print(data.latitude);
    lcd.cursor(1, 0).print(data.longitude);
  });
});
