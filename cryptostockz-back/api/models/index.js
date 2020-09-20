var env = process.env.NODE_ENV || 'development';
const config = require('../../config/db.config').db[env];
const Sequelize = require("sequelize");


if (config.use_env_variable) {
    var sequelize = new Sequelize(
      process.env.db[config.use_env_variable], config
    );
  } else {
    
    // otherwise we use the config object to initialize our sequelize
    // instance
    var sequelize = new Sequelize(
      config.database, config.username, config.password, config
    );
  }

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.permissions = require("../models/permissions.model.js")(sequelize, Sequelize);
db.base_product = require("../models/base.product.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.illustration = require("../models/illustration.model.js")(sequelize, Sequelize);
db.image = require("../models/image.model.js")(sequelize, Sequelize);



// RELATIONS

// ROLE RELATIONS
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// PERMISSIONS RELATION
db.permissions.belongsToMany(db.user, {
  through: "user_permissions",
  foreignKey: "permissionsId",
  otherKey: "userId"
});
db.user.belongsToMany(db.permissions, {
  through: "user_permissions",
  foreignKey: "userId",
  otherKey: "permissionsId"
});


// WISHLIST RELATION
db.product.belongsToMany(db.user, {
  through: "user_wish_products",
  foreignKey: "productId",
  otherKey: "userId"
});
db.user.belongsToMany(db.product, {
  through: "user_wish_products",
  foreignKey: "userId",
  otherKey: "productId"
});


// // ILLUSTRATIONS o2m
db.base_product.hasMany(db.illustration);
db.illustration.belongsTo(db.base_product);

// BASE PRODUCT

db.user.hasMany(db.base_product, {
  as : 'BaseProducts',
  foreignKey: 'fk_userId', 
  sourceKey: 'id'
});

db.base_product.belongsTo(db.user, {
  as: 'Manufacturer',
  foreignKey: 'fk_manufacturer', 
  targetKey: 'id'
});

// PRODUCT

/*db.product.belongsTo(db.user, {
  as : 'OwnerAddress',
  foreignKey: 'owner_address', 
  targetKey: 'metamaskAccount'
});*/

db.product.belongsTo(db.base_product, {
  as: 'BaseProductId',
  foreignKey: "base_productId",
  target: "id"
});


// IMAGES
db.image.hasOne(db.base_product);
db.image.hasOne(db.illustration);



db.ROLES = ["user", "seller", "manufacturer", "admin"];
db.PERMISSIONS = ["public", "private"];

module.exports = db;