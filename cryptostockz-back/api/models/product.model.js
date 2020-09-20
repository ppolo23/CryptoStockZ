module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    address: {
      type: Sequelize.STRING
    },
    owner_address: {
      type: Sequelize.STRING
    },
    level: {
      type: Sequelize.BIGINT
    },
    dna: {
      type: Sequelize.BIGINT
    },
    uniqueIdentificator: {
      type: Sequelize.STRING
    }
  });

  return Product;
};



