const { app } = require('../bootstraps/swagger.bootstrap')

// routes
require('../routes/auth.routes')(app);
require('../routes/account.routes')(app);
require('../routes/admin.routes')(app);
require('../routes/product.routes')(app);
require('../routes/base.product.routes')(app);
