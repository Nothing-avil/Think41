const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const db = require("./models");

dotenv.config();
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
