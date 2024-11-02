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

}