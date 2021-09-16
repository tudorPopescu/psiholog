const PORT           = process.env.PORT || 8080;
const app            = require("express")();
const config         = require('./init/config').init();
const server         = require('http').createServer(app);
const io             = require('socket.io')(server, {'transports': ['websocket', 'polling'],pingInterval: 15000,pingTimeout: 30000});
const redis          = require('socket.io-redis');
const pg             = require('./db/initPg');
const phantomInit    = require('./init/phantomInit');
const emailTransport = require('./init/emailTransport');

process.env.TZ = 'Europe/Bucharest';
global.NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

global.config = config;
io.adapter(redis(process.env.REDIS_URL));

Promise.all([pg(config), phantomInit.createPhantomSession(app), emailTransport.createTransport(config)]).then(values => {
  app.locals.config = config;
  app.locals.db = values[0];
  app.locals.ph = values[1];
  app.locals.email = global.smtpTransportYour = values[2];

  app.io = io;

  require('./init/express')(app, config);
  require('./routes')(app);

  app.listen(PORT, config.ip, () => {
    console.log('Listening on port: %d, env: %s', PORT, config.env);
    process.on('exit', () => {
      console.log('exiting phantom session');
      app.locals.ph.exit();
    });
  });
}).catch(e => console.log('Init sequence error: ', e));
