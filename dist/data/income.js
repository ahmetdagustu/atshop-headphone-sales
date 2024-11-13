"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.netIncomes = exports.expenses = exports.income = void 0;
exports.calculateMonthlyNetIncome = calculateMonthlyNetIncome;
const orders_1 = require("./orders");
const income = orders_1.orders.map((order) => order.totalPrice);
exports.income = income;
const expenses = [];
exports.expenses = expenses;
// Bu aya ait faturalar
const monthlyExpenses = [
    { type: "Electricity Bill", amount: 120 },
    { type: "Internet Bill", amount: 60 },
    { type: "Office Rent", amount: 550 }
];
// Kargo maliyet hesaplama fonksiyonu
const calculateShippingCost = (order) => {
    let shippingCost = 0;
    order.items.forEach(item => {
        const quantity = item.quantity;
        switch (order.shipping.company) {
            case 'FedEx':
                shippingCost += quantity * 5;
                break;
            case 'DHL':
                shippingCost += quantity * 6;
                break;
            case 'UPS':
                shippingCost += quantity * 10;
                break;
            default:
                shippingCost += 0; // Diğer kargo seçenekleri
                break;
        }
    });
    return { type: "Shipping Cost", amount: shippingCost };
};
// Vergi Giderleri
const taxExpense = {
    type: "Tax",
    amount: income.reduce((total, inc) => total + inc, 0) * 0.1 // %10 vergi
};
// Giderleri birleştir
orders_1.orders.forEach((order) => expenses.push(calculateShippingCost(order)));
expenses.push(...monthlyExpenses);
expenses.push(taxExpense);
// Gelir ve gider toplamlarını hesapla
const totalIncome = income.reduce((total, inc) => total + inc, 0);
const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
// Aylık, yıllık ve tüm zamanların net gelirlerini tutacak bir yapı
const netIncomes = [
    { type: "All Time", netIncome: totalIncome - totalExpenses },
    { type: "This Year", netIncome: calculateYearlyNetIncome() },
    { type: "This Month", netIncome: calculateMonthlyNetIncome() }
];
exports.netIncomes = netIncomes;
// Bu yılın gelir ve gider toplamlarını hesaplayan fonksiyon
function calculateYearlyNetIncome() {
    const currentYear = new Date().getFullYear();
    const yearlyIncome = orders_1.orders
        .filter((order) => new Date(order.orderDate).getFullYear() === currentYear)
        .reduce((total, order) => total + order.totalPrice, 0);
    const yearlyExpenses = expenses
        .filter((expense) => expense.date && new Date(expense.date).getFullYear() === currentYear)
        .reduce((total, expense) => total + expense.amount, 0);
    return yearlyIncome - yearlyExpenses;
}
function calculateMonthlyNetIncome() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const monthlyIncome = orders_1.orders
        .filter((order) => {
        const orderDate = new Date(order.orderDate);
        return orderDate.getFullYear() === currentYear && orderDate.getMonth() === currentMonth;
    })
        .reduce((total, order) => total + order.totalPrice, 0);
    const monthlyExpenses = expenses
        .filter((expense) => {
        const expenseDate = expense.date ? new Date(expense.date) : null;
        return expenseDate && expenseDate.getFullYear() === currentYear && expenseDate.getMonth() === currentMonth;
    })
        .reduce((total, expense) => total + expense.amount, 0);
    return monthlyIncome - monthlyExpenses;
}
