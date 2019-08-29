'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    customer: DataTypes.INTEGER,
    company: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    tax: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    percentage: DataTypes.FLOAT
  }, {});
  Sales.associate = function(models) {
    // associations can be defined here
    Sales.hasMany(models.SalesDetail, {
      foreignKey: {
        name:"salesId",
        field: "salesId",
        allowNull: true
      }
    });
  };
  return Sales;
};
