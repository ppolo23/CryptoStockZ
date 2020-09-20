// Base producto

module.exports = (sequelize, Sequelize) => {
    const Illustration = sequelize.define("illustration", {
      address: {
        type: Sequelize.STRING
      },
      ownerAddress: {
        type: Sequelize.STRING
      },
      requiredLevel: {
        type: Sequelize.BIGINT
      }
    });
  
    return Illustration;
  };

  

