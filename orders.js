import { products } from './products.js';

// Ürün fiyatını ID'ye göre getirir
function getProductPriceById(productId) {
    const product = products.find(p => p.id === productId); // productId'yi id ile eşleştir
    return product ? product.price : 0; // Ürün yoksa 0 döner
}


const orders = [
    {
        orderId: "ORD-20241028-001",
        orderDate: "2024-10-28",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "John Doe",
            address: {
                street: "123 Main St",
                city: "New York",
                state: "NY",
                postalCode: "10001",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL12345",
            estimatedShippingDate: "2024-10-29",
            estimatedDeliveryDate: "2024-11-01",
            deliveryDate: "2024-11-01"
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 12, productCategory: "Wireless", quantity: 1, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                if (unitPrice === 0) console.warn(`Product ID ${item.productId} için fiyat bulunamadı.`);
                item.unitPrice = unitPrice;
                const discountMultiplier = (100 - item.discount) / 100;
                return total + (unitPrice * item.quantity * discountMultiplier);
            }, 0);
        }
    },
    {
        orderId: "ORD-20241027-002",
        orderDate: "2024-10-27",
        currency: "USD",
        status: "Processing",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Emily Clark",
            address: {
                street: "456 Elm St",
                city: "Los Angeles",
                state: "CA",
                postalCode: "90001",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: null,
            estimatedShippingDate: "2024-11-01",
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: true,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        discount: {
            code: null,
            amount: 0
        },
        items: [
            { productId: 22, productCategory: "Wireless", quantity: 1, discount: 5 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241026-003",
        orderDate: "2024-10-26",
        currency: "USD",
        status: "Shipped",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Michael Johnson",
            address: {
                street: "789 Oak St",
                city: "Chicago",
                state: "IL",
                postalCode: "60601",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: null,
            estimatedShippingDate: "2024-11-01",
            estimatedDeliveryDate: "2024-11-03",
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        discount: {
            code: null,
            amount: 0
        },
        items: [
            { productId:24, productCategory: "Wireless", quantity: 1, discount: 0 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241025-004",
        orderDate: "2024-10-25",
        currency: "USD",
        status: "Cancelled",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Sarah Lee",
            address: {
                street: "321 Maple St",
                city: "Houston",
                state: "TX",
                postalCode: "77001",
                country: "USA"
            }
        },
        shipping: {
            company: null,
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: "2024-10-27",
            reason: "Customer Request"
        },
        discount: {
            code: null,
            amount: 0
        },
        items: [
            { productId: 20, productCategory: "In-ear headphone", quantity: 1, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241024-005",
        orderDate: "2024-10-24",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "David Smith",
            address: {
                street: "654 Pine St",
                city: "San Francisco",
                state: "CA",
                postalCode: "94101",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL67890",
            estimatedShippingDate: "2024-11-01",
            estimatedDeliveryDate: "2024-11-04",
            deliveryDate: "2024-11-04"
        },
        invoice: {
            uploaded: true,
            url: "http://atshop/invoice_005.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        discount: {
            code: null,
            amount: 0
        },
        items: [
            { productId: 7, productCategory: "Sport headphone", quantity: 1, discount: 0 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241023-006",
        orderDate: "2024-10-23",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Laura Miller",
            address: {
                street: "789 Birch St",
                city: "New York",
                state: "NY",
                postalCode: "10001",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: "UPS67890",
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-11-02",
            deliveryDate: "2024-11-02"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_006.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 29, productCategory: "Wireless", quantity: 1, discount: 10 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241022-007",
        orderDate: "2024-10-22",
        currency: "USD",
        status: "Processing",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "James Wilson",
            address: {
                street: "123 Elm St",
                city: "Houston",
                state: "TX",
                postalCode: "77001",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: null,
            estimatedShippingDate: "2024-11-01",
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 1, productCategory: "Wireless", quantity: 2, discount: 0 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241021-008",
        orderDate: "2024-10-21",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Robert Taylor",
            address: {
                street: "789 Cedar St",
                city: "New York",
                state: "NY",
                postalCode: "10002",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: "FDX12345",
            estimatedShippingDate: "2024-11-01",
            estimatedDeliveryDate: "2024-11-03",
            deliveryDate: "2024-11-03"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_008.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 23, productCategory: "In-ear headphone", quantity: 2, discount: 0 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241020-009",
        orderDate: "2024-10-20",
        currency: "USD",
        status: "Shipped",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Emma Davis",
            address: {
                street: "123 Spruce St",
                city: "Los Angeles",
                state: "CA",
                postalCode: "90002",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL23456",
            estimatedShippingDate: "2024-11-01",
            estimatedDeliveryDate: "2024-11-04",
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId:4, productCategory: "Wireless", quantity: 1, discount: 0 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241019-010",
        orderDate: "2024-10-19",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Daniel Brown",
            address: {
                street: "123 Pine St",
                city: "Dallas",
                state: "TX",
                postalCode: "75201",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: "FDX12345",
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-10-30",
            deliveryDate: "2024-10-30"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_010.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 16, productCategory: "Sport headphone", quantity: 3, discount: 20 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241018-011",
        orderDate: "2024-10-18",
        currency: "USD",
        status: "Shipped",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Sophia Harris",
            address: {
                street: "456 Oak St",
                city: "Chicago",
                state: "IL",
                postalCode: "60601",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: "UPS34567",
            estimatedShippingDate: "2024-10-28",
            estimatedDeliveryDate: "2024-10-30",
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 40, productCategory: "In-ear headphone", quantity: 1, discount: 5 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241017-012",
        orderDate: "2024-10-17",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Oliver Martinez",
            address: {
                street: "789 Cedar St",
                city: "New York",
                state: "NY",
                postalCode: "10001",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL45678",
            estimatedShippingDate: "2024-10-28",
            estimatedDeliveryDate: "2024-10-30",
            deliveryDate: "2024-10-30"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_012.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 10, productCategory: "Wireless", quantity: 1, discount: 0 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241016-013",
        orderDate: "2024-10-16",
        currency: "USD",
        status: "Cancelled",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Ava Thomas",
            address: {
                street: "321 Elm St",
                city: "San Francisco",
                state: "CA",
                postalCode: "94101",
                country: "USA"
            }
        },
        shipping: {
            company: null,
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: "2024-10-18",
            reason: "Changed Mind"
        },
        items: [
            { productId: 18, productCategory: "Over-ear headphone", quantity: 1, discount: 0 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241015-014",
        orderDate: "2024-10-15",
        currency: "USD",
        status: "Processing",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Isabella Garcia",
            address: {
                street: "101 Oak St",
                city: "Miami",
                state: "FL",
                postalCode: "33101",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: null,
            estimatedShippingDate: "2024-11-02",
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 37, productCategory: "Sport headphone", quantity: 1, discount: 10 },
            { productId: 34, productCategory: "In-ear headphone", quantity: 3, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241014-015",
        orderDate: "2024-10-14",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Ethan White",
            address: {
                street: "303 Birch St",
                city: "Seattle",
                state: "WA",
                postalCode: "98101",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL34567",
            estimatedShippingDate: "2024-11-01",
            estimatedDeliveryDate: "2024-11-04",
            deliveryDate: "2024-11-04"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_015.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 40, productCategory: "In-ear headphone", quantity: 1, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241013-016",
        orderDate: "2024-10-13",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Mia Harris",
            address: {
                street: "202 Pine St",
                city: "Portland",
                state: "OR",
                postalCode: "97201",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: "FDX45678",
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-11-03",
            deliveryDate: "2024-11-03"
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 12, productCategory: "Wireless", quantity: 3, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241012-017",
        orderDate: "2024-10-12",
        currency: "USD",
        status: "Shipped",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Lucas Clark",
            address: {
                street: "505 Walnut St",
                city: "Boston",
                state: "MA",
                postalCode: "02101",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL56789",
            estimatedShippingDate: "2024-11-01",
            estimatedDeliveryDate: "2024-11-04",
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 4, productCategory: "Wireless", quantity: 3, discount: 5 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241011-018",
        orderDate: "2024-10-11",
        currency: "USD",
        status: "Processing",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Amelia Johnson",
            address: {
                street: "606 Maple St",
                city: "Denver",
                state: "CO",
                postalCode: "80201",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: null,
            estimatedShippingDate: "2024-11-02",
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 10, productCategory: "Wireless", quantity: 3, discount: 0 },
            { productId: 6, productCategory: "Sport headphone", quantity: 2, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241010-019",
        orderDate: "2024-10-10",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Noah Brown",
            address: {
                street: "123 Maple St",
                city: "San Diego",
                state: "CA",
                postalCode: "92101",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: "FDX67890",
            estimatedShippingDate: "2024-10-20",
            estimatedDeliveryDate: "2024-10-22",
            deliveryDate: "2024-10-22"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_019.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 2, productCategory: "Wireless", quantity: 3, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241009-020",
        orderDate: "2024-10-09",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Aiden Rodriguez",
            address: {
                street: "456 Oak St",
                city: "Houston",
                state: "TX",
                postalCode: "77001",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL78901",
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-10-20",
            deliveryDate: "2024-10-20"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_020.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 5, productCategory: "In-ear headphone", quantity: 1, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241008-021",
        orderDate: "2024-10-08",
        currency: "USD",
        status: "Cancelled",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Charlotte Lewis",
            address: {
                street: "707 Fir St",
                city: "Atlanta",
                state: "GA",
                postalCode: "30301",
                country: "USA"
            }
        },
        shipping: {
            company: null,
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: "2024-10-10",
            reason: "Product Defect"
        },
        items: [
            { productId: 31, productCategory: "In-ear headphone", quantity: 2, discount: 5 },
            { productId: 11, productCategory: "In-ear headphone", quantity: 3, discount: 0 },
            { productId: 37, productCategory: "Sport headphone", quantity: 3, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241007-022",
        orderDate: "2024-10-07",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Liam Walker",
            address: {
                street: "404 Cedar St",
                city: "Austin",
                state: "TX",
                postalCode: "73301",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: "FDX67890",
            estimatedShippingDate: "2024-11-01",
            estimatedDeliveryDate: "2024-11-03",
            deliveryDate: "2024-11-03"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_022.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 9, productCategory: "Wireless", quantity: 3, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241006-023",
        orderDate: "2024-10-06",
        currency: "USD",
        status: "Shipped",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Emily Anderson",
            address: {
                street: "101 Pine St",
                city: "Phoenix",
                state: "AZ",
                postalCode: "85001",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL78901",
            estimatedShippingDate: "2024-11-01",
            estimatedDeliveryDate: "2024-11-04",
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 35, productCategory: "In-ear headphone", quantity: 3, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241005-024",
        orderDate: "2024-10-05",
        currency: "USD",
        status: "Processing",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Jack Hall",
            address: {
                street: "202 Oak St",
                city: "San Diego",
                state: "CA",
                postalCode: "92101",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: null,
            estimatedShippingDate: "2024-11-02",
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 3, productCategory: "Over-ear headphone", quantity: 3, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241004-025",
        orderDate: "2024-10-04",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Elijah Robinson",
            address: {
                street: "789 Cedar St",
                city: "Phoenix",
                state: "AZ",
                postalCode: "85001",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: "UPS34567",
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-10-15",
            deliveryDate: "2024-10-15"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_025.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 11, productCategory: "In-ear headphone", quantity: 2, discount: 0 },
            { productId: 22, productCategory: "Wireless", quantity: 2, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241003-026",
        orderDate: "2024-10-03",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "James Young",
            address: {
                street: "456 Oak St",
                city: "Miami",
                state: "FL",
                postalCode: "33101",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL56789",
            estimatedShippingDate: "2024-10-12",
            estimatedDeliveryDate: "2024-10-14",
            deliveryDate: "2024-10-14"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_026.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 17, productCategory: "Sport headphone", quantity: 1, discount: 5 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241002-027",
        orderDate: "2024-10-02",
        currency: "USD",
        status: "Shipped",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Olivia King",
            address: {
                street: "123 Maple St",
                city: "Austin",
                state: "TX",
                postalCode: "73301",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: "FDX78901",
            estimatedShippingDate: "2024-10-11",
            estimatedDeliveryDate: "2024-10-13",
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 2, productCategory: "In-ear headphone", quantity: 1, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20241001-028",
        orderDate: "2024-10-01",
        currency: "USD",
        status: "Cancelled",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "William Wright",
            address: {
                street: "808 Fir St",
                city: "Philadelphia",
                state: "PA",
                postalCode: "19101",
                country: "USA"
            }
        },
        shipping: {
            company: null,
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: "2024-10-03",
            reason: "Customer Request"
        },
        items: [
            { productId: 24, productCategory: "Wireless", quantity: 2, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240930-029",
        orderDate: "2024-09-30",
        currency: "USD",
        status: "Processing",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Henry Martinez",
            address: {
                street: "123 Oak St",
                city: "Austin",
                state: "TX",
                postalCode: "73301",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: null,
            estimatedShippingDate: "2024-10-10",
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 20, productCategory: "In-ear headphone", quantity: 1, discount: 0 },
            { productId: 18, productCategory: "Over-ear headphone", quantity: 1, discount: 5 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240929-030",
        orderDate: "2024-09-29",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Ella Collins",
            address: {
                street: "456 Pine St",
                city: "Seattle",
                state: "WA",
                postalCode: "98101",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL78910",
            estimatedShippingDate: "2024-10-08",
            estimatedDeliveryDate: "2024-10-10",
            deliveryDate: "2024-10-10"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_030.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 4, productCategory: "Wireless", quantity: 2, discount: 5 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240928-031",
        orderDate: "2024-09-28",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Grace Perez",
            address: {
                street: "789 Cedar St",
                city: "San Francisco",
                state: "CA",
                postalCode: "94101",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-10-07",
            deliveryDate: "2024-10-07"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_031.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 39, productCategory: "In-ear headphone", quantity: 2, discount: 5 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240927-032",
        orderDate: "2024-09-27",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Benjamin Scott",
            address: {
                street: "202 Maple St",
                city: "Denver",
                state: "CO",
                postalCode: "80201",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: "UPS12345",
            estimatedShippingDate: "2024-10-06",
            estimatedDeliveryDate: "2024-10-08",
            deliveryDate: "2024-10-08"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_032.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 37, productCategory: "Sport headphone", quantity: 1, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240926-033",
        orderDate: "2024-09-26",
        currency: "USD",
        status: "Processing",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Zoe Turner",
            address: {
                street: "404 Birch St",
                city: "Miami",
                state: "FL",
                postalCode: "33101",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: null,
            estimatedShippingDate: "2024-10-05",
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 9, productCategory: "Wireless", quantity: 2, discount: 5 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240925-034",
        orderDate: "2024-09-25",
        currency: "USD",
        status: "Shipped",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Logan Mitchell",
            address: {
                street: "567 Oak St",
                city: "Austin",
                state: "TX",
                postalCode: "73301",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL45678",
            estimatedShippingDate: "2024-10-03",
            estimatedDeliveryDate: "2024-10-05",
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 21, productCategory: "Wireless", quantity: 1, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240924-035",
        orderDate: "2024-09-24",
        currency: "USD",
        status: "Cancelled",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Chloe Harris",
            address: {
                street: "123 Maple St",
                city: "Dallas",
                state: "TX",
                postalCode: "75001",
                country: "USA"
            }
        },
        shipping: {
            company: null,
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: "2024-09-26",
            reason: "Customer Request"
        },
        items: [
            { productId: 30, productCategory: "Wireless", quantity: 1, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240923-036",
        orderDate: "2024-09-23",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Jayden Cooper",
            address: {
                street: "789 Birch St",
                city: "San Francisco",
                state: "CA",
                postalCode: "94101",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-10-01",
            deliveryDate: "2024-10-01"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_036.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 10, productCategory: "Wireless", quantity: 2, discount: 5 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240922-037",
        orderDate: "2024-09-22",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Avery King",
            address: {
                street: "456 Pine St",
                city: "Seattle",
                state: "WA",
                postalCode: "98101",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL67890",
            estimatedShippingDate: "2024-10-02",
            estimatedDeliveryDate: "2024-10-04",
            deliveryDate: "2024-10-04"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_037.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 13, productCategory: "Over-ear headphone", quantity: 3, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240921-038",
        orderDate: "2024-09-21",
        currency: "USD",
        status: "Processing",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Gabriel Parker",
            address: {
                street: "123 Oak St",
                city: "Austin",
                state: "TX",
                postalCode: "73301",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: null,
            estimatedShippingDate: "2024-10-01",
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 24, productCategory: "Wireless", quantity: 1, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240920-039",
        orderDate: "2024-09-20",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Scarlett Adams",
            address: {
                street: "404 Pine St",
                city: "Miami",
                state: "FL",
                postalCode: "33101",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: "UPS56789",
            estimatedShippingDate: "2024-10-01",
            estimatedDeliveryDate: "2024-10-04",
            deliveryDate: "2024-10-04"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_039.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 20, productCategory: "In-ear headphone", quantity: 1, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240919-040",
        orderDate: "2024-09-19",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Lily Reed",
            address: {
                street: "789 Maple St",
                city: "Denver",
                state: "CO",
                postalCode: "80201",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-09-28",
            deliveryDate: "2024-09-28"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_040.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 25, productCategory: "In-ear headphone", quantity: 3, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240918-041",
        orderDate: "2024-09-18",
        currency: "USD",
        status: "Shipped",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Elijah Bailey",
            address: {
                street: "456 Oak St",
                city: "Miami",
                state: "FL",
                postalCode: "33101",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL12345",
            estimatedShippingDate: "2024-09-27",
            estimatedDeliveryDate: "2024-09-29",
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 25, productCategory: "In-ear headphone", quantity: 2, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240917-042",
        orderDate: "2024-09-17",
        currency: "USD",
        status: "Cancelled",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Sofia Rivera",
            address: {
                street: "808 Cedar St",
                city: "Austin",
                state: "TX",
                postalCode: "73301",
                country: "USA"
            }
        },
        shipping: {
            company: null,
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: "2024-09-19",
            reason: "Customer Changed Mind"
        },
        items: [
            { productId: 29, productCategory: "Wireless", quantity: 1, discount: 5 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240916-043",
        orderDate: "2024-09-16",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Wyatt Murphy",
            address: {
                street: "123 Elm St",
                city: "New York",
                state: "NY",
                postalCode: "10001",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-09-25",
            deliveryDate: "2024-09-25"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_043.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 23, productCategory: "In-ear headphone", quantity: 3, discount: 5 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240915-044",
        orderDate: "2024-09-15",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Hannah Ramirez",
            address: {
                street: "456 Elm St",
                city: "Austin",
                state: "TX",
                postalCode: "73301",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: "FDX56789",
            estimatedShippingDate: "2024-09-25",
            estimatedDeliveryDate: "2024-09-27",
            deliveryDate: "2024-09-27"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_044.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 29, productCategory: "Wireless", quantity: 1, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240914-045",
        orderDate: "2024-09-14",
        currency: "USD",
        status: "Processing",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Luke Howard",
            address: {
                street: "789 Oak St",
                city: "Seattle",
                state: "WA",
                postalCode: "98101",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: null,
            estimatedShippingDate: "2024-09-24",
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 35, productCategory: "In-ear headphone", quantity: 3, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240913-046",
        orderDate: "2024-09-13",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Layla Morris",
            address: {
                street: "456 Maple St",
                city: "Miami",
                state: "FL",
                postalCode: "33101",
                country: "USA"
            }
        },
        shipping: {
            company: "FedEx",
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-09-23",
            deliveryDate: "2024-09-23"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_046.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 33, productCategory: "Over-ear headphone", quantity: 1, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240912-047",
        orderDate: "2024-09-12",
        currency: "USD",
        status: "Shipped",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Dylan Cook",
            address: {
                street: "123 Cedar St",
                city: "Denver",
                state: "CO",
                postalCode: "80201",
                country: "USA"
            }
        },
        shipping: {
            company: "UPS",
            trackingNumber: "UPS78910",
            estimatedShippingDate: "2024-09-21",
            estimatedDeliveryDate: "2024-09-23",
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 40, productCategory: "Over-ear headphone", quantity: 3, discount: 10 }
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240911-048",
        orderDate: "2024-09-11",
        currency: "USD",
        status: "Cancelled",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Evelyn Gray",
            address: {
                street: "567 Oak St",
                city: "New York",
                state: "NY",
                postalCode: "10001",
                country: "USA"
            }
        },
        shipping: {
            company: null,
            trackingNumber: null,
            estimatedShippingDate: null,
            estimatedDeliveryDate: null,
            deliveryDate: null
        },
        invoice: {
            uploaded: false,
            url: null
        },
        cancellation: {
            date: "2024-09-13",
            reason: "Customer Cancellation"
        },
        items: [
            { productId: 20, productCategory: "In-ear headphone", quantity: 1, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240910-049",
        orderDate: "2024-09-10",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Victoria Hughes",
            address: {
                street: "123 Birch St",
                city: "Phoenix",
                state: "AZ",
                postalCode: "85001",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL45678",
            estimatedShippingDate: "2024-09-20",
            estimatedDeliveryDate: "2024-09-22",
            deliveryDate: "2024-09-22"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_049.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 25, productCategory: "In-ear headphone", quantity: 2, discount: 10 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    },
    {
        orderId: "ORD-20240909-050",
        orderDate: "2024-09-09",
        currency: "USD",
        status: "Delivered",
        paymentMethod: "Credit Card",
        customer: {
            isLoggedIn: true,
            name: "Eli Patterson",
            address: {
                street: "789 Maple St",
                city: "Los Angeles",
                state: "CA",
                postalCode: "90001",
                country: "USA"
            }
        },
        shipping: {
            company: "DHL",
            trackingNumber: "DHL12345",
            estimatedShippingDate: null,
            estimatedDeliveryDate: "2024-09-19",
            deliveryDate: "2024-09-19"
        },
        invoice: {
            uploaded: true,
            url: "http://example.com/invoice_050.pdf"
        },
        cancellation: {
            date: null,
            reason: null
        },
        items: [
            { productId: 35, productCategory: "In-ear headphone", quantity: 3, discount: 0 },
        ],
        get totalPrice() {
            return this.items.reduce((total, item) => {
                const unitPrice = getProductPriceById(item.productId);
                return total + (unitPrice * item.quantity * (1 - (item.discount || 0) / 100));
            }, 0);
        }
    }
  ];
  
  // Export the array for use in other modules
  export default orders;
  
  
