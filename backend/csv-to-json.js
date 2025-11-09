const fs = require("fs");
const csv = require("csv-parser");

let results = [];

fs.createReadStream("products_sample.csv")
  .pipe(csv())
  .on("data", (data) => {
    try {
      results.push({
        name: data.product_name || "No Name",
        description: data.description || "",
        price: data.discounted_price
          ? Number(data.discounted_price.replace(/[^0-9]/g, ""))
          : Number(data.retail_price.replace(/[^0-9]/g, "")) || 0,
        brand: data.brand || "",
        images: data.image
          ? JSON.parse(data.image.replace(/'/g, '"'))
          : [],
      });
    } catch (err) {
      console.log("Skipping row due to error:", err);
    }
  })
  .on("end", () => {
    fs.writeFileSync("products.json", JSON.stringify(results, null, 2));
    console.log("✅ CSV converted to JSON successfully!");
  });
