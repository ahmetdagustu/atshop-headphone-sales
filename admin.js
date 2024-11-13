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





async function loadDashboard() {
    const mainContent = document.getElementById("main-content");

    if (!mainContent) {
        console.error("Element with ID 'main-content' not found.");
        return;
    }

    try {
        // API çağrıları
        const ordersResponse = await fetch('http://localhost:3000/api/orders');
        if (!ordersResponse.ok) throw new Error(`Error fetching orders: ${ordersResponse.status}`);
        const orders = await ordersResponse.json();
    
        const response = await fetch('http://localhost:3000/api/productQuestions');
        if (!response.ok) throw new Error(`Error fetching product questions: ${response.status}`);
        const productQandA = await response.json();
    
        const financeResponse = await fetch('http://localhost:3000/api/finance');
        if (!financeResponse.ok) throw new Error(`Error fetching finance data: ${financeResponse.status}`);
        const financeData = await financeResponse.json();
        const { monthlyNetIncome, netIncomes = [] } = financeData; // `netIncomes` tanımlı değilse boş bir dizi olarak ayarla
    
        // Order status count
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
    
        // Unanswered questions check
        const hasUnansweredQuestion = productQandA.some(question => question.answered === false);
    
        // Get yearly net income
        const yearlyNetIncome = netIncomes.find(income => income.type === "This Year")?.netIncome || 0;
    
        // Render the dashboard layout
        const monthlyNetIncomeValue = (monthlyNetIncome !== undefined && monthlyNetIncome !== null) ? monthlyNetIncome : 0;
        const yearlyNetIncomeValue = (yearlyNetIncome !== undefined && yearlyNetIncome !== null) ? yearlyNetIncome : 0;

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
                        <div class="value">$${monthlyNetIncomeValue.toFixed(2)}</div>
                    </div>
                </div>

                <!-- Customers Box showing Yearly Net Income -->
                <div class="col-md-3">
                    <div class="dashboard-card customers-box" onclick="loadFinance()">
                        <h5>This Year's Net Income</h5>
                        <div class="value">$${yearlyNetIncomeValue.toFixed(2)}</div>
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
    
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }    
}



async function loadProducts() {
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

    // API'den ürün verilerini çekme
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();

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



async function createOrdersSection() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
        console.error("Ana kapsayıcı bulunamadı. 'main-content' ID'sine sahip bir div ekleyin.");
        return;
    }

    mainContent.innerHTML = ''; // Clear existing content

    // Siparişler ve ürünler verisini API'den çekme
    const ordersResponse = await fetch('http://localhost:3000/api/orders');
    const orders = await ordersResponse.json();

    const productsResponse = await fetch('http://localhost:3000/api/products');
    const products = await productsResponse.json();

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
                            statusMessage = order.shipping?.deliveryDate 
                                ? `<p class="text-success">Teslim Edildi: ${order.shipping.deliveryDate}</p>` 
                                : `<p class="text-warning">Teslim Tarihi Bilgisi Yok</p>`;
                            break;
                        case 'Processing':
                            statusMessage = order.shipping?.estimatedShippingDate 
                                ? `<p class="text-warning">Tahmini Kargoya Verilme Tarihi: ${order.shipping.estimatedShippingDate}</p>` 
                                : `<p class="text-warning">Tahmini Kargoya Verilme Tarihi Bilgisi Yok</p>`;
                            break;
                        case 'Shipped':
                            statusMessage = order.shipping?.estimatedDeliveryDate 
                                ? `<p class="text-warning">Tahmini Teslim Tarihi: ${order.shipping.estimatedDeliveryDate}</p>` 
                                : `<p class="text-warning">Tahmini Teslim Tarihi Bilgisi Yok</p>`;
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
                    recipient.textContent = order.customer?.name;
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

                // Birim Fiyat
                const unitPrice = document.createElement('td');
                unitPrice.textContent = formatCurrency(product.price, order.currency);

                // Kargo Bilgisi
                const shippingInfo = document.createElement('td');
                if (index === 0) {
                    shippingInfo.rowSpan = order.items.length;
                    if (order.status !== 'Cancelled' && order.shipping?.trackingNumber) {
                        const trackingButton = document.createElement('button');
                        trackingButton.textContent = 'Kargo Takip';
                        trackingButton.classList.add('btn', 'btn-primary');
                        trackingButton.onclick = () => {
                            let trackingUrl = '';
                            if (order.shipping.company === 'DHL') {
                                trackingUrl = `https://www.dhl.com/tr-tr/home/tracking.html?tracking-id=${order.shipping.trackingNumber}`;
                            } else if (order.shipping.company === 'FedEx') {
                                trackingUrl = `https://www.fedex.com/wtrk/track/?trknbr=${order.shipping.trackingNumber}`;
                            } else if (order.shipping.company === 'UPS') {
                                trackingUrl = `https://www.ups.com/track?loc=tr_TR&tracknum=${order.shipping.trackingNumber}`;
                            }
                            if (trackingUrl) window.open(trackingUrl, '_blank');
                        };
                        shippingInfo.appendChild(trackingButton);
                    } else {
                        shippingInfo.innerHTML = '<p class="text-muted fw-bold">KARGOYA VERİLMESİ BEKLENİYOR</p>';
                    }
                }

                // Fatura Bilgisi veya İptal Sebebi
                const invoice = document.createElement('td');
                if (index === 0) {
                    invoice.rowSpan = order.items.length;
                    invoice.innerHTML = order.status === 'Cancelled'
                        ? `<p><strong>İptal Edilme Sebebi:</strong> ${order.cancellation.reason}</p>`
                        : `<p><strong>Toplam: ${formatCurrency(order.totalPrice, order.currency)}</strong></p>
                           ${order.invoice?.uploaded ? '<span class="text-success">Faturayı Gör</span>' : '<span class="text-danger">Fatura Bekleniyor</span>'}
                           <button class="btn btn-outline-secondary">Fatura İşlemleri</button>`;
                }

                // Durum Bilgisi
                const status = document.createElement('td');
                if (index === 0) {
                    status.rowSpan = order.items.length;
                    status.innerHTML = order.status === 'Delivered'
                        ? '<span class="badge bg-success">Teslim Edildi</span>'
                        : order.status === 'Cancelled'
                            ? `<span class="badge bg-danger">İptal Edildi</span>`
                            : '<span class="badge bg-warning">Beklemede</span>';
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



async function loadFinance() {
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

    // Finans verilerini API'den çekme
    const financeResponse = await fetch('http://localhost:3000/api/finance');
    const { income, expenses, netIncomes } = await financeResponse.json();

    // Verileri güncelleme ve hesaplama
    const totalIncome = income.reduce((sum, value) => sum + value, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netResult = totalIncome - totalExpenses;

    document.getElementById("total-income").textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById("total-expenses").textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("net-result").textContent = `$${netResult.toFixed(2)}`;

    // Gelir ve gider tablolarını doldurma
    const incomeTableBody = document.getElementById("incomeTableBody");
    income.forEach((amount, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>Order-${index + 1}</td>
            <td>$${amount.toFixed(2)}</td>
        `;
        incomeTableBody.appendChild(row);
    });

    const expenseTableBody = document.getElementById("expenseTableBody");
    expenses.forEach((expense, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${expense.type}</td>
            <td>$${expense.amount.toFixed(2)}</td>
        `;
        expenseTableBody.appendChild(row);
    });

    // Grafik oluşturma fonksiyonlarını çağırma
    generateIncomeCategoryDonutChart(income);
    generateExpenseTypeDonutChart(expenses);
    //generateMonthlyIncomeExpenseChart();
}

function generateIncomeCategoryDonutChart(income) {
    const ctx = document.getElementById('incomeCategoryDonutChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: income.map((_, i) => `Order ${i + 1}`),
            datasets: [{
                data: income,
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            }],
        },
    });
}

function generateExpenseTypeDonutChart(expenses) {
    const ctx = document.getElementById('expenseTypeDonutChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: expenses.map(expense => expense.type),
            datasets: [{
                data: expenses.map(expense => expense.amount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }],
        },
    });
}


async function populateFinanceData() {
    const incomeBox = document.getElementById("total-income");
    const expenseBox = document.getElementById("total-expenses");
    const netResultBox = document.getElementById("net-result");
    const incomeTableBody = document.getElementById("incomeTableBody");
    const expenseTableBody = document.getElementById("expenseTableBody");

    // API’den gelir, gider ve sipariş verilerini çekme
    const financeResponse = await fetch('http://localhost:3000/api/finance');
    const { income, expenses } = await financeResponse.json();

    const ordersResponse = await fetch('http://localhost:3000/api/orders');
    const orders = await ordersResponse.json();

    // Gelir ve giderleri hesaplama
    const totalIncome = income.reduce((total, amount) => total + amount, 0);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const netResult = totalIncome - totalExpenses;

    // Box değerlerini güncelleme
    incomeBox.innerText = `$${totalIncome.toFixed(2)}`;
    expenseBox.innerText = `$${totalExpenses.toFixed(2)}`;
    netResultBox.innerText = `$${netResult.toFixed(2)}`;
    netResultBox.style.backgroundColor = netResult >= 0 ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)";

    // Gelir tablosunu doldurma
    incomeTableBody.innerHTML = ''; // Önceki içeriği temizleme
    income.forEach((amount, index) => {
        const order = orders[index];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order ? order.orderId : 'N/A'}</td>
            <td>$${amount.toFixed(2)}</td>
        `;
        incomeTableBody.appendChild(row);
    });

    // Gider tablosunu doldurma
    expenseTableBody.innerHTML = ''; // Önceki içeriği temizleme
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


async function loadCustomers() {
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

    // API’den müşteri verilerini çekme
    const response = await fetch('http://localhost:3000/api/customers');
    const customers = await response.json();

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


async function loadQandA() {
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

    // API’den Q&A verilerini çekme
    const response = await fetch('http://localhost:3000/api/questions');
    const productQandA = await response.json();

    // Populate the table with Q&A data
    const qaTableBody = document.getElementById("qaTableBody");

    productQandA.forEach(item => {
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


async function loadReviews() {
    const mainContent = document.getElementById("main-content");

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

    // API’den reviews verisini çekme
    const response = await fetch('http://localhost:3000/api/reviews');
    const reviews = await response.json();

    // Veriyi tabloya ekleme
    reviews.forEach(productReview => {
        const productId = productReview.id;

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
                <td>${productId}</td>
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


async function loadMarketing() {
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
                    <tbody id="campaignTableBody"></tbody>
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

    // Kampanyaları API’den çekme
    const response = await fetch('http://localhost:3000/api/campaigns');
    const campaigns = await response.json();

    const campaignTableBody = document.getElementById("campaignTableBody");

    campaigns.forEach(campaign => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${campaign.name}</td>
            <td><span class="badge ${campaign.status === 'Active' ? 'bg-success' : 'bg-secondary'}">${campaign.status}</span></td>
            <td>${campaign.startDate}</td>
            <td>${campaign.endDate}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                <button class="btn btn-sm btn-outline-danger">Delete</button>
            </td>
        `;
        campaignTableBody.appendChild(row);
    });

    // Call the function to render the campaign performance chart
    renderCampaignPerformanceChart();
}


async function renderCampaignPerformanceChart() {
    const ctx = document.getElementById('campaignPerformanceChart').getContext('2d');

    // Kampanya performans verisini API’den çekme
    const response = await fetch('http://localhost:3000/api/campaign-performance');
    const performanceData = await response.json();

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: performanceData.labels,
            datasets: [{
                label: 'Engagement',
                data: performanceData.engagement,
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





// Sayfa yüklendiğinde otomatik olarak Dashboard'u yükle
document.addEventListener("DOMContentLoaded", () => {
    const defaultButton = document.querySelector('.nav-link');
    loadPage('dashboard', defaultButton);
    defaultButton.classList.add('active');
});

// Sayfayı dinamik olarak yükleme fonksiyonu
async function loadPage(page, element) {
    // Remove 'active' class from all navigation links
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    
    // Automatically set 'active' class based on the 'page' parameter
    const navItem = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (navItem) {
        navItem.classList.add('active');
    }

    // Clear previous content
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = ''; // Clear the current content

    // Switch between pages based on the 'page' parameter
    switch (page) {
        case 'dashboard':
            await loadDashboard();
            break;
        case 'products':
            await loadProducts();
            break;
        case 'orders':
            await createOrdersSection(); // Load the Orders section
            break;
        case 'finance':
            await loadFinance(); // Load the Finance section
            break;
        case 'customers':
            await loadCustomers(); // Load the Customers section
            break;
        case 'qa':
            await loadQandA(); // Load the Q&A section
            break;
        case 'reviews':
            await loadReviews(); // Load the Reviews section
            break;
        case 'marketing':
            await loadMarketing(); // Load the Marketing section
            break;
        default:
            await loadDefaultPage(page); // Load other default pages if needed
    }
}

// Fonksiyonları global hale getirme
window.loadPage = loadPage;
window.loadDashboard = loadDashboard;
window.loadProducts = loadProducts;

window.createOrdersSection = createOrdersSection;
window.toggleSidebar = toggleSidebar;



