// db.bootstrap.js

const db = require("../models");
const Role = db.role;
const Permissions = db.permissions;
const Product = db.product;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});


// CREATE FIRST ROLES

function initial() {
    Permissions.create({
      id: 1,
      name: "public"
    });
   
    Permissions.create({
      id: 2,
      name: "private"
    });

    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "seller"
    });
   
    Role.create({
      id: 3,
      name: "manufacturer"
    });
   
    Role.create({
      id: 4,
      name: "admin"
    });
  }