import orders from './orders.js';

// Gelir array - Orders'dan gelen gelirleri toplarız
const income = orders.map(order => order.totalPrice);

// Gider array - Bu aya ait giderler ve kargo maliyetleri
const expenses = [];

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
orders.forEach(order => expenses.push(calculateShippingCost(order)));
expenses.push(...monthlyExpenses);
expenses.push(taxExpense);

// Gelir ve gider toplamlarını hesapla
const totalIncome = income.reduce((total, inc) => total + inc, 0);
const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

// Aylık, yıllık ve tüm zamanların net gelirlerini tutacak bir yapı
const netIncomes = [
    { type: "All Time", netIncome: totalIncome - totalExpenses },
    { type: "This Year", netIncome: calculateYearlyNetIncome() }, // Bu yılın net geliri
    { type: "This Month", netIncome: calculateMonthlyNetIncome() } // Bu ayın net geliri
];

// Bu yılın gelir ve gider toplamlarını hesaplayan fonksiyon
function calculateYearlyNetIncome() {
    const currentYear = new Date().getFullYear();
    const yearlyIncome = orders
        .filter(order => new Date(order.date).getFullYear() === currentYear)
        .reduce((total, order) => total + order.totalPrice, 0);

    const yearlyExpenses = expenses
        .filter(expense => new Date(expense.date).getFullYear() === currentYear)
        .reduce((total, expense) => total + expense.amount, 0);

    return yearlyIncome - yearlyExpenses;
}

// Bu ayın gelir ve gider toplamlarını hesaplayan fonksiyon
function calculateMonthlyNetIncome() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const monthlyIncome = orders
        .filter(order => {
            const orderDate = new Date(order.date);
            return orderDate.getFullYear() === currentYear && orderDate.getMonth() === currentMonth;
        })
        .reduce((total, order) => total + order.totalPrice, 0);

    const monthlyExpenses = expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getFullYear() === currentYear && expenseDate.getMonth() === currentMonth;
        })
        .reduce((total, expense) => total + expense.amount, 0);

    return monthlyIncome - monthlyExpenses;
}

// Dışa aktarım, admin.js içinde kullanıma uygun
export { income, expenses, netIncomes, calculateMonthlyNetIncome };
