"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yearlyIncomeSummary = exports.monthlyIncomeSummary = void 0;
exports.addMonthlyIncome = addMonthlyIncome;
exports.addYearlyIncome = addYearlyIncome;
exports.monthlyIncomeSummary = [];
exports.yearlyIncomeSummary = [];
function addMonthlyIncome(month, income, expenses) {
    const net = income - expenses;
    exports.monthlyIncomeSummary.push({ month, income, expenses, net });
}
function addYearlyIncome(year, income, expenses) {
    const net = income - expenses;
    exports.yearlyIncomeSummary.push({ year, income, expenses, net });
}
