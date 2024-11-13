export interface MonthlyData {
    month: string;
    revenue: number; 
    expenses: number;
    sales: number; 
  }
  
  // Yıllık veri yapısı
  export interface YearlyData {
    year: number;
    totalRevenue: number;
    totalExpenses: number;
    totalSales: number;
    monthlyData: MonthlyData[];
  }
  