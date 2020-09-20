// swagger.bootstrap.js

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const config = require('../../config/config');
const bodyParser = require('body-parser');
const cors = require("cors");

var corsOptions = {
  origin: config.env.WEBAPP_URL+":3000"
  // origin: config.env.WEBAPP_URL+":"+config.env.WEBAPP_PORT
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// WEB API
const DEFAULT_PORT = config.env.WEBAPP_PORT;

function run(appRoot, port) {
  return new Promise((resolve, reject) => {

    try {
      const config = { appRoot };

      SwaggerExpress.create(config, (err, swaggerExpress) => {
        if (err) { throw err; }
        // install middleware
        swaggerExpress.register(app);
        const appPort = port || DEFAULT_PORT;
        app.listen(appPort);

        console.log(`Server listening on port ${appPort}...`);
        return resolve();
      });
    } catch (error) {
      return reject(error);
    }
  });
}



module.exports = {
  run, 
  app
};


