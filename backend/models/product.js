module.exports = (sequelize) => {
  const { DataTypes } = require("sequelize");
  return sequelize.define(
    "Product",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      cost: DataTypes.Float,
      category: DataTypes.STRING,
      name: DataTypes.STRING,
      brand: DataTypes.STRING,
      retail_price: DataTypes.FLOAT,
      department: DataTypes.STRING,
      sku: DataTypes.STRING,
      distribution_center_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};
