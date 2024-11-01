// income.js
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

// Dışa aktarım, admin.js içinde kullanıma uygun
export { income, expenses };
