require('dotenv').config();
const twilio = require('twilio');
const Tessel = require('tessel-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Tessel()
});

const sid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const sender = process.env.PHONE_NUMBER;
const recipient = process.env.MY_NUMBER;
const client = new twilio(sid, authToken);

board.on('ready', () => {
  const door = new five.Switch({
    pin: 'a2',
    invert: true
  });
  const led = new five.Led('a5');

  door.on('open', () => {
    led.on();
    const details = {
      body: `Hi Gaby! ${Date.now()}`,
      from: sender,
      to: recipient
    };

    client.messages.create(details, error => {
      if (error) {
        console.error(error.message);
      }
    });
  });
  door.on('close', () => led.off());
});
