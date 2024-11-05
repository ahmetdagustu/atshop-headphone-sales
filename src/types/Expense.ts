export interface Expense {
    type: string;
    amount: number;
    date?: string; // Opsiyonel olarak giderlerin tarihini ekleyebilirsiniz
}