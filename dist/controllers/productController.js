"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.getProducts = void 0;
const products_1 = require("../data/products");
const getProducts = (req, res) => {
    res.json(products_1.products);
};
exports.getProducts = getProducts;
const addProduct = (req, res) => {
    const newProduct = req.body;
    products_1.products.push(newProduct);
    res.status(201).json(newProduct);
};
exports.addProduct = addProduct;
