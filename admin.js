import { products } from './products.js'; // products.js dosyasından ürünleri içe aktarıyoruz
import orders from './orders.js';
import { reviews } from './reviews.js';
import { income, expenses, netIncomes, calculateMonthlyNetIncome } from './income.js';
import { customers } from './customers.js';
import { headphoneQandA } from './productQuestions.js';




// Sidebar'ı daraltıp genişletme fonksiyonu
function toggleSidebar() {
    const sidebar = document.getElementById("sidebarMenu");
    sidebar.classList.toggle("collapsed");

    // Genişliğe göre içerik alanını ayarla
    const content = document.querySelector(".content");
    if (sidebar.classList.contains("collapsed")) {
        content.style.marginLeft = "80px";
    } else {
        content.style.marginLeft = "240px";
    }
}

// Fonksiyonu global alana atama
window.toggleSidebar = toggleSidebar;

















// Dashboard sayfası içeriğini yükleme fonksiyonu


function loadDashboard() {
    const mainContent = document.getElementById("main-content");

    if (!mainContent) {
        console.error("Element with ID 'main-content' not found.");
        return;
    }

    // Calculate order statuses
    let newOrderCount = 0;
    let preparingCount = 0;
    let completedCount = 0;
    let returnedCount = 0;
    let hasNewOrder = false;

    orders.forEach(order => {
        switch (order.status) {
            case "New":
                newOrderCount++;
                hasNewOrder = true;
                break;
            case "Processing":
                preparingCount++;
                break;
            case "Delivered":
                completedCount++;
                break;
            case "Cancelled":
                returnedCount++;
                break;
        }
    });

    // Check for unanswered questions
    const hasUnansweredQuestion = headphoneQandA.some(question => question.answered === false);

    // Get the monthly and yearly net income
    const monthlyNetIncome = calculateMonthlyNetIncome();
    const yearlyNetIncome = netIncomes.find(income => income.type === "This Year")?.netIncome || 0;

    // Render the dashboard layout
    mainContent.innerHTML = `
        <div class="row">
            <!-- Orders Section with Counts -->
            <div class="col-md-3">
                <div class="dashboard-card orders-box">
                    <h5>Orders</h5>
                    <p>New Order: <span id="new-orders">${newOrderCount}</span></p>
                    <p>Preparing: <span id="preparing-orders">${preparingCount}</span></p>
                    <p>Completed: <span id="completed-orders">${completedCount}</span></p>
                    <p>Returned: <span id="returned-orders">${returnedCount}</span></p>
                </div>
            </div>
            
            <!-- Products Box with Conditional Buttons for New Sales and Questions -->
            <div class="col-md-3">
                <div class="dashboard-card products-box">
                    <div id="new-sale-button"></div>
                    <div id="new-question-button"></div>
                </div>
            </div>
            
            <!-- Revenue Box showing Monthly Net Income -->
            <div class="col-md-3">
                <div class="dashboard-card revenue-box" onclick="loadFinance()">
                    <h5>This Month's Revenue</h5>
                    <div class="value">$${monthlyNetIncome.toFixed(2)}</div>
                </div>
            </div>

            <!-- Customers Box showing Yearly Net Income -->
            <div class="col-md-3">
                <div class="dashboard-card customers-box" onclick="loadFinance()">
                    <h5>This Year's Net Income</h5>
                    <div class="value">$${yearlyNetIncome.toFixed(2)}</div>
                </div>
            </div>
        </div>
    `;

    // Set up the New Sale button
    const newSaleButtonContainer = document.getElementById("new-sale-button");
    if (hasNewOrder) {
        const newSaleButton = document.createElement("button");
        newSaleButton.className = "blinking-button bordered-box";
        newSaleButton.textContent = "New Sale Available!";
        newSaleButton.onclick = () => loadPage('orders', document.querySelector('.nav-link[data-page="orders"]'));
        newSaleButtonContainer.appendChild(newSaleButton);
    } else {
        newSaleButtonContainer.innerHTML = `<p class="static-message bordered-box">No new sales at the moment</p>`;
    }

    // Set up the New Question button
    const newQuestionButtonContainer = document.getElementById("new-question-button");
    if (hasUnansweredQuestion) {
        const newQuestionButton = document.createElement("button");
        newQuestionButton.className = "blinking-button secondary-button bordered-box";
        newQuestionButton.textContent = "New Question Available!";
        newQuestionButton.onclick = () => loadPage('qa', document.querySelector('.nav-link[data-page="qa"]'));
        newQuestionButtonContainer.appendChild(newQuestionButton);
    } else {
        newQuestionButtonContainer.innerHTML = `<p class="static-message bordered-box">No questions pending for response</p>`;
    }
}




















// Ürünler sayfasını yükleme fonksiyonu
function loadProducts() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <button class="btn btn-primary">Add New Product</button>
                <button class="btn btn-danger">Delete Selected</button>
            </div>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Original Price</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Color</th>
                    <th>Rating</th>
                    <th>Description</th>
                    <th>Units Sold</th>
                    <th>Favorited</th>
                    <th>Upload Date</th>
                    <th>Review Count</th>
                    <th>Today Shipment</th>
                    <th>Active</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody id="product-table">
                <!-- Products will be loaded here -->
            </tbody>
        </table>

        <!-- Modal for Description -->
        <div id="descriptionModal" class="adminModal" style="display: none;">
            <div class="modal-content-read">
                <span class="close-read">&times;</span>
                <h4>Description</h4>
                <p id="modal-description"></p>
            </div>
        </div>
    `;

    // Ürün verilerini tabloya yükleme
    const productTable = document.getElementById("product-table");

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="checkbox" /></td>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" width="50" /></td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>$${product.originalPrice}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>${product.color}</td>
            <td>${product.rating.toFixed(1)}</td>
            <td><button class="btn btn-info read-btn" data-description="${product.description}">Read</button></td>
            <td>${product.unitsSold}</td>
            <td>${product.favorited}</td>
            <td>${product.uploadDate}</td>
            <td>${product.reviewCount}</td>
            <td>${product.todayShipment ? "Yes" : "No"}</td>
            <td>
                <input type="checkbox" ${product.onSale ? "checked" : ""} id="active-${product.id}" />
                <label for="active-${product.id}" class="switch"></label>
            </td>
            <td><button class="btn btn-outline-secondary"><i class="fas fa-edit"></i></button></td>
            <td><button class="btn btn-outline-danger"><i class="fas fa-trash"></i></button></td>
        `;
        productTable.appendChild(row);

        // "Read" butonuna olay dinleyici ekleyin
        const readButton = row.querySelector(".read-btn");
        readButton.addEventListener("click", () => {
            document.getElementById("modal-description").textContent = product.description;
            document.getElementById("descriptionModal").style.display = "flex";
        });
    });

    // Modal kapatma işlevselliği
    const closeModal = document.querySelector(".close-read");
    closeModal.addEventListener("click", () => {
        document.getElementById("descriptionModal").style.display = "none";
    });

    // Modal dışında bir yere tıklayınca kapatma
    window.addEventListener("click", (event) => {
        if (event.target === document.getElementById("descriptionModal")) {
            document.getElementById("descriptionModal").style.display = "none";
        }
    });
}

window.createOrdersSection = createOrdersSection;

function createOrdersSection() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
        console.error("Ana kapsayıcı bulunamadı. 'main-content' ID'sine sahip bir div ekleyin.");
        return;
    }

    mainContent.innerHTML = ''; // Clear existing content

    // Create table
    const table = document.createElement('table');
    table.classList.add('orders-table');

    // Table headers
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Sipariş Bilgileri</th>
            <th>Paket No</th>
            <th>Alıcı</th>
            <th>Adet</th>
            <th>Bilgiler</th>
            <th>Birim Fiyat</th>
            <th>Kargo</th>
            <th>Fatura</th>
            <th>Durum</th>
        </tr>
    `;
    table.appendChild(thead);

    // Table body
    const tbody = document.createElement('tbody');

    // Create table rows for each order
    // Para birimini simgeye göre döndüren yardımcı fonksiyon
        function formatCurrency(amount, currency) {
            let symbol;
            switch (currency) {
                case "USD":
                    symbol = "$";
                    break;
                case "EUR":
                    symbol = "€";
                    break;
                case "TRY":
                    symbol = "₺";
                    break;
                default:
                    symbol = currency;
            }
            return `${symbol}${amount}`;
        }

        // Orders üzerinde dolaşarak işlemleri gerçekleştiren kodun içine ekleme
        orders.forEach(order => {
            order.items.forEach((item, index) => {
                const product = products.find(p => p.id === item.productId);
                if (product) {
                    const row = document.createElement('tr');
        
                    // Sipariş Bilgileri
                    const orderInfo = document.createElement('td');
                    if (index === 0) {
                        orderInfo.rowSpan = order.items.length;
        
                        let statusMessage = '';
                        switch (order.status) {
                            case 'Delivered':
                                if (order.shipping && order.shipping.deliveryDate) {
                                    statusMessage = `<p class="text-success">Teslim Edildi: ${order.shipping.deliveryDate}</p>`;
                                } else {
                                    statusMessage = `<p class="text-warning">Teslim Tarihi Bilgisi Yok</p>`;
                                }
                                break;
                            case 'Processing':
                                if (order.shipping && order.shipping.estimatedShippingDate) {
                                    statusMessage = `<p class="text-warning">Tahmini Kargoya Verilme Tarihi: ${order.shipping.estimatedShippingDate}</p>`;
                                } else {
                                    statusMessage = `<p class="text-warning">Tahmini Kargoya Verilme Tarihi Bilgisi Yok</p>`;
                                }
                                break;
                            case 'Shipped':
                                if (order.shipping && order.shipping.estimatedDeliveryDate) {
                                    statusMessage = `<p class="text-warning">Tahmini Teslim Tarihi: ${order.shipping.estimatedDeliveryDate}</p>`;
                                } else {
                                    statusMessage = `<p class="text-warning">Tahmini Teslim Tarihi Bilgisi Yok</p>`;
                                }
                                break;
                            case 'Cancelled':
                                statusMessage = `<p class="text-danger">İptal Edildi: ${order.cancellation.date}</p>`;
                                break;
                            default:
                                statusMessage = `<p class="text-warning">Kargo Bekleniyor</p>`;
                        }
        
                        orderInfo.innerHTML = `
                            <p><strong>#${order.orderId}</strong></p>
                            <p>Sipariş Tarihi: ${order.orderDate}</p>
                            ${statusMessage}
                        `;
                    }
        
                    // Paket No
                    const packageNo = document.createElement('td');
                    if (index === 0) {
                        packageNo.rowSpan = order.items.length;
                        packageNo.textContent = order.orderId;
                    }
        
                    // Alıcı Bilgisi
                    const recipient = document.createElement('td');
                    if (index === 0) {
                        recipient.rowSpan = order.items.length;
                        recipient.textContent = order.customer?.name
                    }

        
                    // Adet
                    const quantity = document.createElement('td');
                    quantity.textContent = item.quantity;
        
                    // Ürün Bilgileri
                    const productInfo = document.createElement('td');
                    productInfo.innerHTML = `
                        <a href="http://127.0.0.1:5508/shop-page.html?id=${product.id}" class="product-name">${product.name}</a><br>
                        <img src="${product.image}" alt="${product.name}" width="50"><br>
                        <p>Renk: ${product.color}</p>
                    `;
        
                    // Birim Fiyat (Para birimi sembolüyle)
                    const unitPrice = document.createElement('td');
                    unitPrice.textContent = formatCurrency(product.price, order.currency);
        
                    // Kargo Bilgisi (Boş Bırakılıyor)
                    const shippingInfo = document.createElement('td');
                    if (index === 0) {
                        shippingInfo.rowSpan = order.items.length;

                        if (order.status === 'Cancelled') {
                            // Sipariş iptal edildiyse kargo bilgisini boş bırak
                            shippingInfo.innerHTML = '';
                        } else {
                            // Eğer takip numarası varsa butonu ekle, yoksa "KARGONUN VERİLMESİ BEKLENİYOR" mesajını göster
                            if (order.shipping.trackingNumber) {
                                const trackingButton = document.createElement('button');
                                trackingButton.textContent = 'Kargo Takip';
                                trackingButton.classList.add('btn', 'btn-primary');

                                // Kargo şirketine göre URL oluştur
                                let trackingUrl = '';
                                if (order.shipping.company === 'DHL') {
                                    trackingUrl = `https://www.dhl.com/tr-tr/home/tracking.html?tracking-id=${order.shipping.trackingNumber}`;
                                } else if (order.shipping.company === 'FedEx') {
                                    trackingUrl = `https://www.fedex.com/wtrk/track/?trknbr=${order.shipping.trackingNumber}`;
                                } else if (order.shipping.company === 'UPS') {
                                    trackingUrl = `https://www.ups.com/track?loc=tr_TR&tracknum=${order.shipping.trackingNumber}`;
                                }

                                // URL varsa butona tıklayınca yeni sekmede aç
                                if (trackingUrl) {
                                    trackingButton.onclick = () => window.open(trackingUrl, '_blank');
                                }

                                // Butonu shippingInfo hücresine ekle
                                shippingInfo.appendChild(trackingButton);
                            } else {
                                // Takip numarası yoksa sadece "KARGONUN VERİLMESİ BEKLENİYOR" mesajını göster
                                const waitingMessage = document.createElement('p');
                                waitingMessage.textContent = "KARGOYA VERİLMESİ BEKLENİYOR";
                                waitingMessage.classList.add('text-muted', 'fw-bold'); // Hafif gri renkte ve kalın gösterim
                                shippingInfo.appendChild(waitingMessage);
                            }
                        }
                    }


                    // Fatura Bilgisi veya İptal Sebebi
                    const invoice = document.createElement('td');
                    if (index === 0) {
                        invoice.rowSpan = order.items.length;
                        if (order.status === 'Cancelled') {
                            invoice.innerHTML = `<p><strong>İptal Edilme Sebebi:</strong> ${order.cancellation.reason}</p>`;
                        } else {
                            invoice.innerHTML = `
                                <p><strong>Toplam: ${formatCurrency(order.totalPrice, order.currency)}</strong></p>
                                ${order.invoice?.uploaded
                                    ? '<span class="text-success">Faturayı Gör</span>'
                                    : '<span class="text-danger">Fatura Bekleniyor</span>'}
                                <button class="btn btn-outline-secondary">Fatura İşlemleri</button>
                            `;
                        }
                    }
        
                    // Durum Bilgisi
                    const status = document.createElement('td');
                    if (index === 0) {
                        status.rowSpan = order.items.length;
                        status.innerHTML = `
                            ${order.status === 'Delivered'
                                ? '<span class="badge bg-success">Teslim Edildi</span>'
                                : order.status === 'Cancelled'
                                    ? `<span class="badge bg-danger">İptal Edildi</span>`
                                    : '<span class="badge bg-warning">Beklemede</span>'}
                        `;
                    }
        
                    // Satıra hücreleri ekle
                    if (index === 0) {
                        row.appendChild(orderInfo);
                        row.appendChild(packageNo);
                        row.appendChild(recipient);
                    }
                    row.appendChild(quantity);
                    row.appendChild(productInfo);
                    row.appendChild(unitPrice);
                    if (index === 0) {
                        row.appendChild(shippingInfo);
                        row.appendChild(invoice);
                        row.appendChild(status);
                    }
        
                    tbody.appendChild(row);
                }
            });
        });
        
        
        

    table.appendChild(tbody);
    mainContent.appendChild(table);
}

// Call `createOrdersSection` when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createOrdersSection();
});

export function loadFinance() {
    const mainContent = document.getElementById("main-content");

    // Clear existing content and add Finance layout
    mainContent.innerHTML = `
        <div class="row">
            <!-- Top boxes for Revenue, Expenses, and Net Result -->
            <div class="col-md-4">
                <div class="finance-card" id="incomeBox">
                    <h5>Income</h5>
                    <div class="value" id="total-income">$0</div>
                    <p class="subtext">This Month's Revenue</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="finance-card" id="expenseBox">
                    <h5>Expenses</h5>
                    <div class="value" id="total-expenses">$0</div>
                    <p class="subtext">This Month's Expenses</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="finance-card" id="netResultBox">
                    <h5>Net Result</h5>
                    <div class="value" id="net-result">$0</div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <!-- Three charts: Income by Category, Expense by Type, Monthly Line Chart -->
            <div class="col-md-4">
                <canvas id="incomeCategoryDonutChart" width="300" height="300"></canvas>
            </div>
            <div class="col-md-4">
                <canvas id="expenseTypeDonutChart" width="300" height="300"></canvas>
            </div>
            <div class="col-md-4">
                <canvas id="monthlyIncomeExpenseChart" width="300" height="300"></canvas>
            </div>
        </div>

        <!-- Bottom tables for Income and Expenses -->
        <div class="row mt-4">
            <div class="col-md-6">
                <h5>Income Details</h5>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody id="incomeTableBody"></tbody>
                </table>
            </div>
            <div class="col-md-6">
                <h5>Expense Details</h5>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody id="expenseTableBody"></tbody>
                </table>
            </div>
        </div>
    `;

    // Call functions to populate the data and charts
    populateFinanceData();
    generateIncomeCategoryDonutChart();
    generateExpenseTypeDonutChart();
    //generateMonthlyIncomeExpenseChart();
}

function populateFinanceData() {
    const incomeBox = document.getElementById("total-income");
    const expenseBox = document.getElementById("total-expenses");
    const netResultBox = document.getElementById("net-result");
    const incomeTableBody = document.getElementById("incomeTableBody");
    const expenseTableBody = document.getElementById("expenseTableBody");

    // Calculate total income and expenses
    const totalIncome = income.reduce((total, amount) => total + amount, 0);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const netResult = totalIncome - totalExpenses;

    // Update boxes
    incomeBox.innerText = `$${totalIncome.toFixed(2)}`;
    expenseBox.innerText = `$${totalExpenses.toFixed(2)}`;
    netResultBox.innerText = `$${netResult.toFixed(2)}`;
    netResultBox.style.backgroundColor = netResult >= 0 ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)";

    // Populate Income Table
    incomeTableBody.innerHTML = ''; // Clear any previous content
    income.forEach((amount, index) => {
        const order = orders[index];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order.orderId}</td>
            <td>$${amount.toFixed(2)}</td>
        `;
        incomeTableBody.appendChild(row);
    });

    // Populate Expense Table
    expenseTableBody.innerHTML = ''; // Clear any previous content
    expenses.forEach((expense, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${expense.type}</td>
            <td>$${expense.amount.toFixed(2)}</td>
        `;
        expenseTableBody.appendChild(row);
    });
}

function generateIncomeCategoryDonutChart() {
    const ctx = document.getElementById("incomeCategoryDonutChart").getContext("2d");
    const categoryTotals = {};

    // Calculate total income by category
    orders.forEach(order => {
        order.items.forEach(item => {
            const category = item.productCategory;
            const amount = item.unitPrice * item.quantity * ((100 - item.discount) / 100);
            categoryTotals[category] = (categoryTotals[category] || 0) + amount;
        });
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0', '#F44336'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: $${context.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

function generateExpenseTypeDonutChart() {
    const ctx = document.getElementById("expenseTypeDonutChart").getContext("2d");
    const expenseTotals = {
        "Shipping Cost": 0,
        "Electricity Bill": 0,
        "Internet Bill": 0,
        "Office Rent": 0,
        "Tax": 0
    };

    // Calculate total expenses by type
    expenses.forEach(expense => {
        if (expenseTotals.hasOwnProperty(expense.type)) {
            expenseTotals[expense.type] += expense.amount;
        }
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(expenseTotals),
            datasets: [{
                data: Object.values(expenseTotals),
                backgroundColor: ['#FFA726', '#42A5F5', '#AB47BC', '#66BB6A', '#EF5350'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: $${context.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}
function generateMonthlyIncomeExpenseChart() {
    const ctx = document.getElementById("monthlyIncomeExpenseChart").getContext("2d");
    const monthlyIncome = new Array(12).fill(0);
    const monthlyExpenses = new Array(12).fill(0);

    // Aggregate monthly income and expenses
    orders.forEach(order => {
        const month = new Date(order.orderDate).getMonth();
        monthlyIncome[month] += order.totalPrice;
    });

    expenses.forEach(expense => {
        const month = new Date(expense.date).getMonth();
        monthlyExpenses[month] += expense.amount;
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: 'Income',
                    data: monthlyIncome,
                    borderColor: '#4CAF50',
                    fill: false
                },
                {
                    label: 'Expenses',
                    data: monthlyExpenses,
                    borderColor: '#F44336',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}








// Run loadFinance on page load
document.addEventListener("DOMContentLoaded", loadFinance);


function loadCustomers() {
    // Get the main content container
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = ''; // Clear previous content

    // Create the customer table structure
    const table = document.createElement("table");
    table.classList.add("table", "table-bordered", "customer-table"); // Bootstrap classes for basic styling
    table.innerHTML = `
        <thead style="background-color: #f8f9fa; color: #333;">
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>User Role</th>
                <th>Address</th>
                <th>Purchase History</th>
                <th>Reviews</th>
                <th>Questions</th>
            </tr>
        </thead>
        <tbody id="customerTableBody"></tbody>
    `;
    mainContent.appendChild(table);

    // Populate the table with customer data
    const customerTableBody = document.getElementById("customerTableBody");

    customers.forEach(customer => {
        // Create table row
        const row = document.createElement("tr");

        // Address formatting
        const address = `<div>${customer.address.street}</div>
                         <div>${customer.address.city}, ${customer.address.state}</div>
                         <div>${customer.address.postalCode}, ${customer.address.country}</div>`;

        // Purchase history formatting
        const purchaseHistory = customer.purchaseHistory.map(purchase => 
            `<li style="margin-bottom: 5px; color: #555;">Order ID: <strong>${purchase.orderId}</strong> - ${purchase.orderDate}<br> 
             Items: ${purchase.items.map(item => 
                `<span style="color: #777;">- ${item.productCategory} (Qty: ${item.quantity})</span>`
            ).join('')}</li>`
        ).join('');

        // Reviews formatting (assuming review text is available in customer.reviews array)
        const reviews = customer.reviews.length ? 
            customer.reviews.map(review => `<li style="color: #444;">${review}</li>`).join('') : 
            `<span style="color: #999;">No reviews</span>`;

        // Questions formatting (assuming questions are available in customer.questions array)
        const questions = customer.questions.length ? 
            customer.questions.map(question => `<li style="color: #444;">${question}</li>`).join('') : 
            `<span style="color: #999;">No questions</span>`;

        // Populate row with data
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.username}</td>
            <td>${customer.role || 'Customer'}</td>
            <td>${address}</td>
            <td><ul style="padding-left: 15px; list-style-type: circle;">${purchaseHistory}</ul></td>
            <td><ul style="padding-left: 15px; list-style-type: circle;">${reviews}</ul></td>
            <td><ul style="padding-left: 15px; list-style-type: circle;">${questions}</ul></td>
        `;

        customerTableBody.appendChild(row);
    });
}




function loadQandA() {
    // Get main content area
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = ''; // Clear previous content

    // Create the Q&A table structure
    const table = document.createElement("table");
    table.classList.add("qa-table");
    table.innerHTML = `
        <thead>
            <tr>
                <th><input type="checkbox" id="selectAll"></th>
                <th>Product ID</th>
                <th>Username</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Time</th>
                <th>Likes</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="qaTableBody"></tbody>
    `;
    mainContent.appendChild(table);

    // Populate the table with Q&A data
    const qaTableBody = document.getElementById("qaTableBody");

    headphoneQandA.forEach(item => {
        const row = document.createElement("tr");

        // Create individual checkbox for the row
        const checkboxCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("select-row");
        checkboxCell.appendChild(checkbox);

        // Format the timestamps
        const questionTime = new Date(item.questionTime).toLocaleString();
        const answerTime = item.answerTime ? new Date(item.answerTime).toLocaleString() : "Not answered yet";

        // Populate row with data
        row.innerHTML = `
            <td>${item.productId}</td>
            <td>${item.userName}</td>
            <td>${item.question}</td>
            <td>${item.answer || "No answer yet"}</td>
            <td>
                <div>Q: ${questionTime}</div>
                <hr>
                <div>A: ${answerTime}</div>
            </td>
            <td>${item.questionLike || 0}</td>
            <td>
                <button class="view-btn">View</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        // Insert the checkbox cell at the beginning of the row
        row.insertBefore(checkboxCell, row.firstChild);

        qaTableBody.appendChild(row);
    });

    // Event listener for 'select all' checkbox
    document.getElementById("selectAll").addEventListener("change", function() {
        const checkboxes = document.querySelectorAll(".select-row");
        checkboxes.forEach(checkbox => checkbox.checked = this.checked);
    });
}



function loadReviews() {
    const mainContent = document.getElementById("main-content");
    
    // Create the Reviews page structure
    mainContent.innerHTML = `
        <div class="d-flex justify-content-between mb-3">
            <button class="btn btn-primary">Create Review</button>
            <button class="btn btn-secondary">Import</button>
            <button class="btn btn-secondary">Export</button>
        </div>
        <input type="text" class="form-control mb-3" placeholder="Search review...">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Content</th>
                    <th>Rating</th>
                    <th>Likes</th>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="reviews-table-body"></tbody>
        </table>
    `;
    
    const tableBody = document.getElementById('reviews-table-body');

    // Loop through each product in the reviews array
    reviews.forEach(productReview => {
        const productId = productReview.id;

        // Loop through each customer review for the current product
        productReview.customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${customer.profilerpic}" alt="${customer.idname}" class="rounded-circle me-2" style="width: 30px; height: 30px;">
                    ${customer.idname}
                </td>
                <td>${customer.review}</td>
                <td style="color: gold;">${'★'.repeat(customer.rated)}${'☆'.repeat(5 - customer.rated)}</td>
                <td>${customer.reviewLİke || 0}</td>
                <td>${productId}</td> <!-- Use the product ID here -->
                <td><span class="badge bg-success">Approved</span></td>
                <td>${new Date(customer.reviewDate).toLocaleDateString()} ${new Date(customer.reviewDate).toLocaleTimeString()}</td>
                <td>
                    <a href="#" class="text-primary me-2">Edit</a>
                    <a href="#" class="text-danger">Delete</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    });
}


function loadMarketing() {
    const mainContent = document.getElementById("main-content");
    
    mainContent.innerHTML = `
        <div class="d-flex justify-content-between mb-3">
            <h2>Marketing Management</h2>
            <button class="btn btn-primary">Create New Campaign</button>
        </div>

        <!-- Campaign Management Section -->
        <div class="card mb-4">
            <div class="card-header">
                <h5>Campaigns</h5>
            </div>
            <div class="card-body">
                <table class="table table-striped table-bordered">
                    <thead style="background-color: #343a40; color: white;">
                        <tr>
                            <th>Campaign Name</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>New Year Sale</td>
                            <td><span class="badge bg-success">Active</span></td>
                            <td>2024-12-01</td>
                            <td>2025-01-01</td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                <button class="btn btn-sm btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                        <!-- Additional campaigns can be added here -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Email Marketing Section -->
        <div class="card mb-4">
            <div class="card-header">
                <h5>Email Marketing</h5>
            </div>
            <div class="card-body">
                <p>Send special offers and announcements to customers.</p>
                <button class="btn btn-secondary">Send New Email</button>
            </div>
        </div>

        <!-- Campaign Performance Section -->
        <div class="card mb-4">
            <div class="card-header">
                <h5>Campaign Performance</h5>
            </div>
            <div class="card-body">
                <canvas id="campaignPerformanceChart"></canvas>
            </div>
        </div>
    `;

    // Call the function to render the campaign performance chart
    renderCampaignPerformanceChart();
}

function renderCampaignPerformanceChart() {
    const ctx = document.getElementById('campaignPerformanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4'],
            datasets: [{
                label: 'Engagement',
                data: [120, 150, 100, 200],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}







// Varsayılan sayfa yükleme fonksiyonu
function loadDefaultPage(page) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `<p>Content for ${page} will be shown here.</p>`;
}

// Sayfa yüklendiğinde otomatik olarak Dashboard'u yükle
document.addEventListener("DOMContentLoaded", () => {
    const defaultButton = document.querySelector('.nav-link');
    loadPage('dashboard', defaultButton);
    defaultButton.classList.add('active');
});




// Sayfayı dinamik olarak yükleme fonksiyonu
function loadPage(page, element) {
    // Remove 'active' class from all navigation links
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    
    // Add 'active' class to the clicked element, if provided
    if (element) {
        element.classList.add('active');
    }

    // Clear previous content
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = ''; // Clear the current content

    // Switch between pages based on the 'page' parameter
    switch (page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'products':
            loadProducts();
            break;
        case 'orders':
            createOrdersSection(); // Load the Orders section
            break;
        case 'finance':
            loadFinance(); // Load the Finance section
            break;
        case 'customers':
            loadCustomers(); // Load the Customers section
            break;
        case 'qa':
            loadQandA(); // Load the Q&A section
            break;
        case 'reviews':
            loadReviews(); // Load the Reviews section
            break;
        case 'marketing':
            loadMarketing(); // Load the Marketing section
            break;
        default:
            loadDefaultPage(page); // Load other default pages if needed
    }
}



// Fonksiyonları global hale getirme
window.loadPage = loadPage;
window.loadDashboard = loadDashboard;
window.loadProducts = loadProducts;
window.loadDefaultPage = loadDefaultPage;


