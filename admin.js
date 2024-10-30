import { products } from './products.js'; // products.js dosyasından ürünleri içe aktarıyoruz
import orders from './orders.js';
import { reviews } from './reviews.js';

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
    mainContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="dashboard-card total-revenue">
                    <h5>Monthly Total Revenue</h5>
                    <div class="value" id="total-revenue">$0</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="dashboard-card total-products">
                    <h5>Total Products</h5>
                    <div class="value" id="total-products">0</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="dashboard-card total-orders">
                    <h5>Monthly Total Orders</h5>
                    <div class="value" id="total-orders">0</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="orders-info">
                    <h6>Orders</h6>
                    <p>Preparing: <span id="preparing-orders">0</span></p>
                    <p>Completed: <span id="completed-orders">0</span></p>
                    <p>Returned: <span id="returned-orders">0</span></p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="orders-info">
                    <h6>Products</h6>
                    <p>Low Stock: <span id="low-stock">0</span></p>
                    <p>Reviews: <span id="reviews">0</span></p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Order No</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody id="order-table">
                        <!-- Orders will be injected here -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Calculate monthly total revenue and order count
    const currentMonth = new Date().getMonth() + 1; // JS months are 0-indexed
    const currentYear = new Date().getFullYear();

    let totalRevenue = 0;
    let totalOrders = 0;
    let preparingOrders = 0;
    let completedOrders = 0;
    let returnedOrders = 0;

    // Filter and calculate for current month orders
    const monthlyOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return (
            orderDate.getMonth() + 1 === currentMonth && orderDate.getFullYear() === currentYear
        );
    });

    monthlyOrders.forEach(order => {
        totalRevenue += order.totalPrice;
        totalOrders += 1;
        if (order.status === "Processing") preparingOrders++;
        if (order.status === "Completed") completedOrders++;
        if (order.status === "Cancelled") returnedOrders++;
    });

    // Calculate low stock count and total reviews
    const lowStockCount = products.filter(product => product.quantity < 5).length;
    const totalReviewCount = reviews.reduce((acc, review) => acc + review.customers.length, 0);

    // Update dashboard values
    document.getElementById("total-revenue").textContent = `$${totalRevenue}`;
    document.getElementById("total-orders").textContent = totalOrders;
    document.getElementById("preparing-orders").textContent = preparingOrders;
    document.getElementById("completed-orders").textContent = completedOrders;
    document.getElementById("returned-orders").textContent = returnedOrders;
    document.getElementById("total-products").textContent = products.length;
    document.getElementById("low-stock").textContent = lowStockCount;
    document.getElementById("reviews").textContent = totalReviewCount;

    // Load orders into table
    const orderTable = document.getElementById("order-table");
    monthlyOrders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.customerName}</td>
            <td>${order.status}</td>
            <td>${order.orderDate}</td>
            <td>$${order.totalPrice}</td>
        `;
        orderTable.appendChild(row);
    });
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




function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
}


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
    orders.forEach(order => {
        order.items.forEach((item, index) => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const row = document.createElement('tr');

                // Sipariş Bilgileri
                const orderInfo = document.createElement('td');
                if (index === 0) { // Show for the first product
                    orderInfo.rowSpan = order.items.length;

                    // Determine the appropriate status message
                    let statusMessage = '';
                    if (order.status === 'Delivered') {
                        // Display delivery date directly for Delivered status
                        statusMessage = `<p class="text-success">Teslim Edildi: ${order.deliveryDate}</p>`;
                    } else if (order.status === 'Processing') {
                        // Determine if any product in the order has todayShipment
                        const hasTodayShipment = order.items.some(item => {
                            const product = products.find(p => p.id === item.productId);
                            return product && product.todayShipment;
                        });

                        // Set estimated shipping date based on todayShipment
                        const estimatedShippingDate = addDays(order.orderDate, hasTodayShipment ? 1 : 2);
                        statusMessage = `<p class="text-warning">Tahmini Kargoya Verilme Tarihi: ${estimatedShippingDate}</p>`;
                    } else if (order.status === 'Shipped') {
                        // Set estimated delivery date 4 days after orderDate
                        const estimatedDeliveryDate = addDays(order.orderDate, 4);
                        statusMessage = `<p class="text-warning">Tahmini Teslim Tarihi: ${estimatedDeliveryDate}</p>`;
                    } else {
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
                    recipient.textContent = order.customerName;
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
                unitPrice.textContent = `${product.price} ₺`;

                // Kargo Bilgisi
                const shippingInfo = document.createElement('td');
                if (index === 0) { 
                    shippingInfo.rowSpan = order.items.length;
                    shippingInfo.innerHTML = `
                        <p>${order.shippingCompany || 'Kargo Bilgisi Yok'}</p>
                        <p>Kargo Takip</p>
                    `;
                }

                // Fatura Bilgisi
                const invoice = document.createElement('td');
                if (index === 0) { 
                    invoice.rowSpan = order.items.length;
                    invoice.innerHTML = `
                        <p><strong>Toplam: ${order.totalPrice} ₺</strong></p>
                        ${order.invoiceUploaded 
                            ? '<span class="text-success">Faturayı Gör</span>' 
                            : '<span class="text-danger">Fatura Bekleniyor</span>'}
                        <button class="btn btn-outline-secondary">Fatura İşlemleri</button>
                    `;
                }

                // Durum Bilgisi
                const status = document.createElement('td');
                if (index === 0) { 
                    status.rowSpan = order.items.length;
                    status.innerHTML = `
                        ${order.status === 'Delivered' 
                            ? '<span class="badge bg-success">Teslim Edildi</span>' 
                            : '<span class="badge bg-warning">Beklemede</span>'}
                    `;
                }

                // Append cells to the row
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
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }

    if (page === 'dashboard') {
        loadDashboard();
    } else if (page === 'products') {
        loadProducts();
    } else if (page === 'orders') {
        createOrdersSection(); // Orders sayfasını yüklemek için
    } else {
        loadDefaultPage(page);
    }
}

// Fonksiyonları global hale getirme
window.loadPage = loadPage;
window.loadDashboard = loadDashboard;
window.loadProducts = loadProducts;
window.loadDefaultPage = loadDefaultPage;


