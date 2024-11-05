import { Request, Response } from 'express';
import { products } from '../data/products';

export const getProducts = (req: Request, res: Response) => {
    res.status(200).json(products);
};

export const addProduct = (req: Request, res: Response) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({ message: 'Ürün başarıyla eklendi', product: newProduct });
};
