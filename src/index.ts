// src/index.ts
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ürün rotalarını /products yoluna bağlayın
app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Sunucu şu adreste çalışıyor: http://localhost:${PORT}`);
});
