import { Order } from '../types/order';
import { Expense } from '../types/Expense';
import { orders } from './orders';

// Gelir array - Orders'dan gelen gelirleri toplarız
const income: number[] = orders.map((order: Order) => order.totalPrice);

// Gider array - Bu aya ait giderler ve kargo maliyetleri
const expenses: Expense[] = [];

// Bu aya ait faturalar
const monthlyExpenses: Expense[] = [
    { type: "Electricity Bill", amount: 120 },
    { type: "Internet Bill", amount: 60 },
    { type: "Office Rent", amount: 550 }
];

// Kargo maliyet hesaplama fonksiyonu
const calculateShippingCost = (order: Order): Expense => {
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
const taxExpense: Expense = {
    type: "Tax",
    amount: income.reduce((total: number, inc: number) => total + inc, 0) * 0.1 // %10 vergi
};

// Giderleri birleştir
orders.forEach((order: Order) => expenses.push(calculateShippingCost(order)));
expenses.push(...monthlyExpenses);
expenses.push(taxExpense);

// Gelir ve gider toplamlarını hesapla
const totalIncome: number = income.reduce((total: number, inc: number) => total + inc, 0);
const totalExpenses: number = expenses.reduce((total: number, expense: Expense) => total + expense.amount, 0);

// Aylık, yıllık ve tüm zamanların net gelirlerini tutacak bir yapı
const netIncomes = [
    { type: "All Time", netIncome: totalIncome - totalExpenses },
    { type: "This Year", netIncome: calculateYearlyNetIncome() },
    { type: "This Month", netIncome: calculateMonthlyNetIncome() }
];

// Bu yılın gelir ve gider toplamlarını hesaplayan fonksiyon
function calculateYearlyNetIncome(): number {
    const currentYear = new Date().getFullYear();
    const yearlyIncome: number = orders
        .filter((order: Order) => new Date(order.orderDate).getFullYear() === currentYear)
        .reduce((total: number, order: Order) => total + order.totalPrice, 0);

    const yearlyExpenses: number = expenses
        .filter((expense: Expense) => expense.date && new Date(expense.date).getFullYear() === currentYear)
        .reduce((total: number, expense: Expense) => total + expense.amount, 0);

    return yearlyIncome - yearlyExpenses;
}

// Bu ayın gelir ve gider toplamlarını hesaplayan fonksiyon
function calculateMonthlyNetIncome(): number {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const monthlyIncome: number = orders
        .filter((order: Order) => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getFullYear() === currentYear && orderDate.getMonth() === currentMonth;
        })
        .reduce((total: number, order: Order) => total + order.totalPrice, 0);

    const monthlyExpenses: number = expenses
        .filter((expense: Expense) => {
            const expenseDate = expense.date ? new Date(expense.date) : null;
            return expenseDate && expenseDate.getFullYear() === currentYear && expenseDate.getMonth() === currentMonth;
        })
        .reduce((total: number, expense: Expense) => total + expense.amount, 0);

    return monthlyIncome - monthlyExpenses;
}

// Dışa aktarım, admin.js içinde kullanıma uygun
export { income, expenses, netIncomes, calculateMonthlyNetIncome };
