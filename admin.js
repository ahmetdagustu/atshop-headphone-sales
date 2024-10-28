import { products } from './products.js'; // products.js dosyasından ürünleri içe aktarıyoruz

// admin.js

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

    // Simulate loading data
    setTimeout(() => {
        document.getElementById("total-revenue").textContent = "$1500";
        document.getElementById("total-products").textContent = "150";
        document.getElementById("total-orders").textContent = "220";
        document.getElementById("preparing-orders").textContent = "17";
        document.getElementById("completed-orders").textContent = "120";
        document.getElementById("returned-orders").textContent = "5";
        document.getElementById("low-stock").textContent = "6";
        document.getElementById("reviews").textContent = "15";

        // Example order data
        const orders = [
            { orderNo: "1001", customer: "John Doe", status: "Preparing", date: "2024-10-27", total: "$150.00" },
            { orderNo: "1002", customer: "Jane Smith", status: "Completed", date: "2024-10-26", total: "$200.00" },
            { orderNo: "1003", customer: "Will Brown", status: "Cancelled", date: "2024-10-25", total: "$300.00" },
        ];

        const orderTable = document.getElementById("order-table");
        orders.forEach(order => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.orderNo}</td>
                <td>${order.customer}</td>
                <td>${order.status}</td>
                <td>${order.date}</td>
                <td>${order.total}</td>
            `;
            orderTable.appendChild(row);
        });
    }, 1000);
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
    } else {
        loadDefaultPage(page);
    }
}

// Fonksiyonları global hale getirme
window.loadPage = loadPage;
window.loadDashboard = loadDashboard;
window.loadProducts = loadProducts;
window.loadDefaultPage = loadDefaultPage;


