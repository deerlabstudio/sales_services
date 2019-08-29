'use strict';
module.exports = (sequelize, DataTypes) => {
  const SalesDetail = sequelize.define('SalesDetail', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    subtotal: DataTypes.FLOAT,
    productId: DataTypes.INTEGER,
    salesId: DataTypes.INTEGER
  }, {});
  SalesDetail.associate = function(models) {
    // associations can be defined here
    SalesDetail.belongsTo(models.Sales, { as: "sale", foreignKey: { name:"salesId", field: "salesId", allowNull: true }});
  };
  return SalesDetail;
};
