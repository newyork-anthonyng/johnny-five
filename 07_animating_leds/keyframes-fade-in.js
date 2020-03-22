const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const led = new five.Led('a5');
  const animation = new five.Animation(led);

  animation.enqueue({
    duration: 2000,
    keyFrames: [
      { intensity: 0 },
      { intensity: 100 }
    ],
    oncomplete() {
      console.log('Done!');
    }
  });
});
