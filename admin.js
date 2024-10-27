// Function to dynamically load dashboard data
function loadPage(page, element) {
    // Aktif durumu gösterme
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }

    // Define content for each section
    if (page === 'dashboard') {
        loadDashboard();
    } else {
        loadDefaultPage(page);
    }
}

// Function to load the dashboard content
function loadDashboard() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4>Dashboard</h4>
            <a href="index.html" class="go-to-store btn btn-primary">Go to Store</a>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="dashboard-card total-revenue">
                    <h5>Total Revenue</h5>
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
                    <h5>Total Orders</h5>
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

// Default page loader
function loadDefaultPage(page) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `<p>Content for ${page} will be shown here.</p>`;
}

// Automatically load Dashboard on page load
document.addEventListener("DOMContentLoaded", () => {
    const defaultButton = document.querySelector('.nav-link');
    loadPage('dashboard', defaultButton);
    defaultButton.classList.add('active');
});



