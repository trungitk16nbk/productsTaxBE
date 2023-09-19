"use strict";

const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 5000;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'chrome-extension://khjnjdmnalkmfgakpkpponbkadajalnn');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

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
