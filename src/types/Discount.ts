export interface Discount {
    id?: number;
    discountType?: string;
    code?: string | null; 
    amount: number;
    appliedDiscountType?: string; 
}
