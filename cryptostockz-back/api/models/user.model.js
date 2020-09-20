module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    manufacturerName: {
      type: Sequelize.STRING
    },
    purchases: {
      type: Sequelize.FLOAT
    },
    sales: {
      type: Sequelize.FLOAT
    },
    level: {
      type: Sequelize.BIGINT
    },
    metamaskAccount: {
      type: Sequelize.STRING,
      unique: true
    }
  });

  return User;
};