"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_1 = require("../data/customers");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json(customers_1.customers);
});
exports.default = router;
