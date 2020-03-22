const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', function() {
  const rgb = new five.Led.RGB(['a5', 'a6', 'b5']);
  const animation = new five.Animation(rgb);

  const rainbow = () => {
    animation.enqueue({
      loop: true,
      duration: 6000,
      cuePoints: [
        0,
        0.16,
        0.32,
        0.5,
        0.66,
        0.83,
        1
      ],
      keyFrames: [
        { color: 'red' },
        [255, 99, 0],
        { color: 'ffff00' },
        { color: { red: 0x00, green: 0xFF, blue: 0x00 } },
        { color: 'indigo' },
        '#4B0082'
      ],
      oncomplete: rainbow
    });
  };

  rainbow();
});
