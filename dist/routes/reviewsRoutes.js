"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_1 = require("../data/reviews");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json(reviews_1.reviews);
});
exports.default = router;
