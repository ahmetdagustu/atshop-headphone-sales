import { MonthlyIncome, YearlyIncome } from '../types/Income';


export const monthlyIncomeSummary: MonthlyIncome[] = [];


export const yearlyIncomeSummary: YearlyIncome[] = [];


export function addMonthlyIncome(month: string, income: number, expenses: number): void {
    const net = income - expenses;
    monthlyIncomeSummary.push({ month, income, expenses, net });
}


export function addYearlyIncome(year: number, income: number, expenses: number): void {
    const net = income - expenses;
    yearlyIncomeSummary.push({ year, income, expenses, net });
}
