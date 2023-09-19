"use strict";

const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 5000;

const productsData = fs.readFileSync("products.txt", "utf-8");
const products = JSON.parse(productsData);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/products", (req, res) => {
  res.json(products);
});

// khoi dong len server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
