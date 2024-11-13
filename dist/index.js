"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const reviewsRoutes_1 = __importDefault(require("./routes/reviewsRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const productQuestionsRoutes_1 = __importDefault(require("./routes/productQuestionsRoutes"));
const financeRoutes_1 = __importDefault(require("./routes/financeRoutes")); // finance rotasını ekliyoruz
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/products', productRoutes_1.default);
app.use('/api/reviews', reviewsRoutes_1.default);
app.use('/api/customers', customerRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/productQuestions', productQuestionsRoutes_1.default);
app.use('/api/finance', financeRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Sunucu şu adreste çalışıyor: http://localhost:${PORT}`);
});
