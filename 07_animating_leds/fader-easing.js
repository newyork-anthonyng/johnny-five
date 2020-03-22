const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const leds = new five.Leds(['a5', 'a6', 'b5']);
  const duration = 2000;

  const fader = () => {
    if (!easingFunctions.length) {
      process.exit();
    }
    const easing = easingFunctions.shift();

    leds.fadeOut(500, () => {
      leds.fadeIn({ easing, duration }, fader);
    });
  };

  fader();
});

const easingFunctions = [
  "linear",
  "inQuad",
  "outQuad",
  "inCube",
  "outCube",
  "inOutCube",
  "inQuart",
  "outQuart",
  "inOutQuart",
  "inQuint",
  "outQuint",
  "inOutQuint",
  "inExpo",
  "outExpo",
  "inOutExpo",
  "inCirc",
  "outCirc",
  "inOutCirc",
  "inBounce",
  "outBounce",
  "inOutBounce",
];
