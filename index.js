"use strict";

const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 5000;
const PATH = path.join(__dirname, "products.txt");

// cau hinh doc du lieu tu body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cau hinh cros
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "chrome-extension://khjnjdmnalkmfgakpkpponbkadajalnn"
  );
  //res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const productsData = fs.readFileSync(PATH, "utf-8");
const products = JSON.parse(productsData);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const { sku, name, tax } = req.body;
  const newProduct = {
    sku,
    name,
    tax,
  };

  products.push(newProduct);
  fs.writeFileSync(PATH, JSON.stringify(products), "utf-8");
  res
    .status(201)
    .json({ message: "Product added successfully", product: newProduct });
});

app.put("/products/:sku", (req, res) => {
  const sku = req.params.sku;
  const { name, tax } = req.body;

  const productToUpdate = products.find(
    (product) => product.sku === sku
  );

  if (productToUpdate) {
    productToUpdate.name = name || productToUpdate.name;
    productToUpdate.tax = tax || productToUpdate.tax;

    fs.writeFileSync(PATH, JSON.stringify(products), "utf-8");

    res.json({
      message: "Product updated successfully",
      product: productToUpdate,
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.delete("/products/:sku", (req, res) => {
  const skuToDelete = req.params.sku;

  const productIndexToDelete = products.findIndex(product => product.sku === skuToDelete);
  if (productIndexToDelete !== -1) {
    const deletedProduct = products.splice(productIndexToDelete, 1);

    fs.writeFileSync(PATH, JSON.stringify(products), "utf-8");

    res.json({ message: "Product deleted successfully", product: deletedProduct });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// khoi dong len server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
