
const { app } = require("./swagger.bootstrap")

var session = require('cookie-session');
var config = require("../../config/config")
var helmet = require('helmet');

app.use(helmet());
app.disable('x-powered-by');

// // TODO: cookie handler
// var { sessionHandler } = require('../middleware/session');
// app.use(sessionHandler)

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  secret: config.env.WEBAPP_SECRET,
  cookie: { secure: true,
            httpOnly: true,
            domain: config.env.WEBAPP_URL,
            path: '/',
            expires: expiryDate
          }
  })
);