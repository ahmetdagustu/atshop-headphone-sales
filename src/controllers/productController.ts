import { Request, Response } from 'express';
import { products } from '../data/products';
import { Product } from '../types/Product';

export const getProducts = (req: Request, res: Response) => {
    res.json(products); 
};

export const addProduct = (req: Request, res: Response) => {
    const newProduct: Product = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct); 
};
