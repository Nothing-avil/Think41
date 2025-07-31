const fs = require("fs");
const csv = require("csv-parser");
const db = require("../models");

async () => {
  await db.sequelize.sync({ force: true });
  fs.createReadStream("D:Sandarbh-SinghalWEBThink41products.csv")
    .pipe(csv())
    .on("data", async (row) => {
      try {
        await db.Product.create({
          id: parseInt(row.id),
          cost: parseFloat(row.cost),
          category: row.category,
          name: row.name,
          brand: row.brand,
          retail_price: parseFloat(row.retail_price),
          department: row.department,
          sku: row.sku,
          distribution_center_id: parseInt(row.distribution_center_id),
        });
      } catch (err) {
        console.error("Error inserting row:", err.message);
      }
    })
    .on("end", () => {
      console.log("CSV successfully loaded.");
    });
};
