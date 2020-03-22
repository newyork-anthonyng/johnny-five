const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const leds = new five.Leds(['a5', 'a6', 'b5']);
  const animation = new five.Animation(leds);

  const animateForever = () => {
    animation.enqueue({
      duration: 2000,
      cuePoints: [0, 0.05, 1.0],
      keyFrames: [
        [
          { intensity: 100 }, { intensity: 0 }, { intensity: 100 }
        ],
        [
          { intensity: 0 }, { intensity: 100 }, { intensity: 0 }
        ],
        [
          { intensity: 100 }, { intensity: 0 }, { intensity: 100 }
        ]
      ],
      oncomplete() {
        console.log('Do it again!');
        animateForever();
      }
    });
  };

  animateForever();
});
