const http = require('http');
const os = require('os');
const path = require('path');

const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

const Express = require('express');
const SocketIO = require('socket.io');

const application = new Express();
const server = new http.Server(application);
const io = new SocketIO(server);

application.use(Express.static(path.join(__dirname, '/app')));
application.use('/vendor', Express.static(__dirname + '/node_modules/'));

board.on('ready', () => {
  const clients = new Set();
  const monitor = new five.Multi({
    controller: 'BME280',
    elevation: 2
  });
  let updated = Date.now() - 5000;

  monitor.on('change', () => {
    const now = Date.now();
    if (now - updated >= 5000) {
      updated = now;

      clients.forEach(recipient => {
        recipient.emit('report', {
          thermometer: monitor.thermometer.fahrenheit,
          barometer: monitor.barometer.pressure,
          hygrometer: monitor.hygrometer.relativeHumidity,
          altimeter: monitor.altimeter.meters
        });
      });
    }
  });

  io.on('connection', socket => {
    if (clients.size < 5) {
      clients.add(socket);

      socket.on('disconnect', () => clients.delete(socket));
    }
  });

  const port = 3000;
  server.listen(port, () => {
    console.log(`http://${os.networkInterfaces().wlan0[0].address}:${port}`);
  });

  process.on('SIGINT', () => {
    server.close();
  });
});
