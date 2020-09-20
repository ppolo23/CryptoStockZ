// app.js

const swaggerExpressBootstrap = require('./api/bootstraps/swagger.bootstrap');

const appRoot = __dirname;



// Restore the database if is needed
const config = require('./config/db.config');
if (process.env.RECREATE_DB || config.RECREATE_DB) {
  require('./api/bootstraps/db.bootstrap');
}

// Import the routes
require('./api/routes');

// web security
require('./api/bootstraps/security.bootstrap');


// RUN APP WEB
(async () => {
  // Run swagger-express service
  await swaggerExpressBootstrap.run(appRoot, process.env.PORT);

  // End
  console.log('Application started successfully.');
})();
