module.exports = (sequelize, Sequelize) => {
    const Permissions = sequelize.define("permissions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Permissions;
  };