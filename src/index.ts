import express from 'express';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = 3000;

app.use(express.json()); // JSON veri alma özelliğini etkinleştirir

// Ürün rotalarını kullan
app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Sunucu şu adreste çalışıyor: http://localhost:${PORT}`);
});
