"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const finance_1 = require("../data/finance");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json(finance_1.financeData);
});
exports.default = router;
