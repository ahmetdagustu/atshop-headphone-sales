// src/controllers/productController.ts
import { Request, Response } from 'express';
import { products } from '../data/products';
import { Product } from '../types/Product';

export const getProducts = (req: Request, res: Response) => {
    res.json(products); // Tüm ürünleri döndür
};

export const addProduct = (req: Request, res: Response) => {
    const newProduct: Product = req.body;
    products.push(newProduct); // Ürünü ekle
    res.status(201).json(newProduct); // Eklenen ürünü döndür
};
