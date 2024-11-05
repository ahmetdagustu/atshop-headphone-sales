import { MonthlyIncome, YearlyIncome } from '../types/Income';

// Array to hold monthly income data
export const monthlyIncomeSummary: MonthlyIncome[] = [];

// Array to hold yearly income data
export const yearlyIncomeSummary: YearlyIncome[] = [];

// Function to add a new monthly income record
export function addMonthlyIncome(month: string, income: number, expenses: number): void {
    const net = income - expenses;
    monthlyIncomeSummary.push({ month, income, expenses, net });
}

// Function to add a new yearly income record
export function addYearlyIncome(year: number, income: number, expenses: number): void {
    const net = income - expenses;
    yearlyIncomeSummary.push({ year, income, expenses, net });
}
