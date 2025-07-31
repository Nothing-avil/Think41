const { Sequelize } = require("sequelize");
const ProductModel = require("./product");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);
const Product = ProductModel(sequelize);
module.exports = { sequelize, Product };
