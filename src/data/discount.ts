// src/data/discounts.ts
import { Discount } from '../types/Discount';

export const discounts: Discount[] = [
    {
        id: 1,
        discountType: "New Year",
        code: "NY2024",
        amount: 10 
    },
    {
        id: 2,
        discountType: "Black Friday",
        code: "BF2024",
        amount: 20 
    },
    {
        id: 3,
        discountType: "Summer Sale",
        code: "SUMMER2024",
        amount: 5 
    },
    {
        id: 4,
        discountType: "Holiday Special",
        code: "HOLIDAY2024",
        amount: 10
    },
    {
        id: 5,
        discountType: "Flash Sale",
        code: "FLASH2024",
        amount: 20 
    }
];
