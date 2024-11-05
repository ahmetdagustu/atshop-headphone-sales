// src/types/Discount.ts
export interface Discount {
    id?: number;
    discountType?: string;
    code?: string | null; // `code` alanı null olabilir
    amount: number;
    appliedDiscountType?: string; // Bu alanı ekleyerek hatayı çözüyoruz
}
