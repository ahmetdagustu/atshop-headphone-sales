import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import reviewsRoutes from './routes/reviewsRoutes';
import customerRoutes from './routes/customerRoutes';
import orderRoutes from './routes/orderRoutes';
import productQuestionsRoutes from './routes/productQuestionsRoutes';
import financeRoutes from './routes/financeRoutes'; // finance rotasını ekliyoruz

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/productQuestions', productQuestionsRoutes);
app.use('/api/finance', financeRoutes);

app.listen(PORT, () => {
    console.log(`Sunucu şu adreste çalışıyor: http://localhost:${PORT}`);
});
