export const customers = [
    {
        name: "John Doe",
        address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA"
        },
        username: "johndoe_ny10001",
        purchaseHistory: [
            {
                orderId: "ORD-20241028-001",
                orderDate: "2024-10-28",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL12345",
                items: [
                    { productId: 12, productCategory: "Wireless", quantity: 1, discount: 10 }
                ],
                totalPrice: 0  // totalPrice hesaplanacak
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Emily Clark",
        address: {
            street: "456 Elm St",
            city: "Los Angeles",
            state: "CA",
            postalCode: "90001",
            country: "USA"
        },
        username: "emilyclark_la90001",
        purchaseHistory: [
            {
                orderId: "ORD-20241027-002",
                orderDate: "2024-10-27",
                currency: "USD",
                status: "Processing",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: null,
                items: [
                    { productId: 22, productCategory: "Wireless", quantity: 1, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Michael Johnson",
        address: {
            street: "789 Oak St",
            city: "Chicago",
            state: "IL",
            postalCode: "60601",
            country: "USA"
        },
        username: "michaeljoh_ch60601",
        purchaseHistory: [
            {
                orderId: "ORD-20241026-003",
                orderDate: "2024-10-26",
                currency: "USD",
                status: "Shipped",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: null,
                items: [
                    { productId: 24, productCategory: "Wireless", quantity: 1, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Sarah Lee",
        address: {
            street: "321 Maple St",
            city: "Houston",
            state: "TX",
            postalCode: "77001",
            country: "USA"
        },
        username: "sarahlee_tx77001",
        purchaseHistory: [
            {
                orderId: "ORD-20241025-004",
                orderDate: "2024-10-25",
                currency: "USD",
                status: "Cancelled",
                paymentMethod: "Credit Card",
                shippingCompany: null,
                trackingNumber: null,
                items: [
                    { productId: 20, productCategory: "In-ear headphone", quantity: 1, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "David Smith",
        address: {
            street: "654 Pine St",
            city: "San Francisco",
            state: "CA",
            postalCode: "94101",
            country: "USA"
        },
        username: "davidsmith_sf94101",
        purchaseHistory: [
            {
                orderId: "ORD-20241024-005",
                orderDate: "2024-10-24",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL67890",
                items: [
                    { productId: 7, productCategory: "Sport headphone", quantity: 1, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Laura Miller",
        address: {
            street: "789 Birch St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA"
        },
        username: "lauramiller_ny10001",
        purchaseHistory: [
            {
                orderId: "ORD-20241023-006",
                orderDate: "2024-10-23",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: "UPS67890",
                items: [
                    { productId: 29, productCategory: "Wireless", quantity: 1, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "James Wilson",
        address: {
            street: "123 Elm St",
            city: "Houston",
            state: "TX",
            postalCode: "77001",
            country: "USA"
        },
        username: "jameswilson_tx77001",
        purchaseHistory: [
            {
                orderId: "ORD-20241022-007",
                orderDate: "2024-10-22",
                currency: "USD",
                status: "Processing",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: null,
                items: [
                    { productId: 1, productCategory: "Wireless", quantity: 2, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Robert Taylor",
        address: {
            street: "789 Cedar St",
            city: "New York",
            state: "NY",
            postalCode: "10002",
            country: "USA"
        },
        username: "roberttaylor_ny10002",
        purchaseHistory: [
            {
                orderId: "ORD-20241021-008",
                orderDate: "2024-10-21",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: "FDX12345",
                items: [
                    { productId: 23, productCategory: "In-ear headphone", quantity: 2, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Emma Davis",
        address: {
            street: "123 Spruce St",
            city: "Los Angeles",
            state: "CA",
            postalCode: "90002",
            country: "USA"
        },
        username: "emmadavis_ca90002",
        purchaseHistory: [
            {
                orderId: "ORD-20241020-009",
                orderDate: "2024-10-20",
                currency: "USD",
                status: "Shipped",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL23456",
                items: [
                    { productId: 4, productCategory: "Wireless", quantity: 1, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Daniel Brown",
        address: {
            street: "123 Pine St",
            city: "Dallas",
            state: "TX",
            postalCode: "75201",
            country: "USA"
        },
        username: "danielbrown_tx75201",
        purchaseHistory: [
            {
                orderId: "ORD-20241019-010",
                orderDate: "2024-10-19",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: "FDX12345",
                items: [
                    { productId: 16, productCategory: "Sport headphone", quantity: 3, discount: 20 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Sophia Harris",
        address: {
            street: "456 Oak St",
            city: "Chicago",
            state: "IL",
            postalCode: "60601",
            country: "USA"
        },
        username: "sophiaharris_il60601",
        purchaseHistory: [
            {
                orderId: "ORD-20241018-011",
                orderDate: "2024-10-18",
                currency: "USD",
                status: "Shipped",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: "UPS34567",
                items: [
                    { productId: 40, productCategory: "In-ear headphone", quantity: 1, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Oliver Martinez",
        address: {
            street: "789 Cedar St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA"
        },
        username: "olivermartinez_ny10001",
        purchaseHistory: [
            {
                orderId: "ORD-20241017-012",
                orderDate: "2024-10-17",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL45678",
                items: [
                    { productId: 10, productCategory: "Wireless", quantity: 1, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Ava Thomas",
        address: {
            street: "321 Elm St",
            city: "San Francisco",
            state: "CA",
            postalCode: "94101",
            country: "USA"
        },
        username: "avathomas_ca94101",
        purchaseHistory: [
            {
                orderId: "ORD-20241016-013",
                orderDate: "2024-10-16",
                currency: "USD",
                status: "Cancelled",
                paymentMethod: "Credit Card",
                shippingCompany: null,
                trackingNumber: null,
                items: [
                    { productId: 18, productCategory: "Over-ear headphone", quantity: 1, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Isabella Garcia",
        address: {
            street: "101 Oak St",
            city: "Miami",
            state: "FL",
            postalCode: "33101",
            country: "USA"
        },
        username: "isabellagarcia_fl33101",
        purchaseHistory: [
            {
                orderId: "ORD-20241015-014",
                orderDate: "2024-10-15",
                currency: "USD",
                status: "Processing",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: null,
                items: [
                    { productId: 37, productCategory: "Sport headphone", quantity: 1, discount: 10 },
                    { productId: 34, productCategory: "In-ear headphone", quantity: 3, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Ethan White",
        address: {
            street: "303 Birch St",
            city: "Seattle",
            state: "WA",
            postalCode: "98101",
            country: "USA"
        },
        username: "ethanwhite_wa98101",
        purchaseHistory: [
            {
                orderId: "ORD-20241014-015",
                orderDate: "2024-10-14",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL34567",
                items: [
                    { productId: 40, productCategory: "In-ear headphone", quantity: 1, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Mia Harris",
        address: {
            street: "202 Pine St",
            city: "Portland",
            state: "OR",
            postalCode: "97201",
            country: "USA"
        },
        username: "miaharris_or97201",
        purchaseHistory: [
            {
                orderId: "ORD-20241013-016",
                orderDate: "2024-10-13",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: "FDX45678",
                items: [
                    { productId: 12, productCategory: "Wireless", quantity: 3, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Lucas Clark",
        address: {
            street: "505 Walnut St",
            city: "Boston",
            state: "MA",
            postalCode: "02101",
            country: "USA"
        },
        username: "lucasclark_ma02101",
        purchaseHistory: [
            {
                orderId: "ORD-20241012-017",
                orderDate: "2024-10-12",
                currency: "USD",
                status: "Shipped",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL56789",
                items: [
                    { productId: 4, productCategory: "Wireless", quantity: 3, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Amelia Johnson",
        address: {
            street: "606 Maple St",
            city: "Denver",
            state: "CO",
            postalCode: "80201",
            country: "USA"
        },
        username: "ameliajohnson_co80201",
        purchaseHistory: [
            {
                orderId: "ORD-20241011-018",
                orderDate: "2024-10-11",
                currency: "USD",
                status: "Processing",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: null,
                items: [
                    { productId: 10, productCategory: "Wireless", quantity: 3, discount: 0 },
                    { productId: 6, productCategory: "Sport headphone", quantity: 2, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Noah Brown",
        address: {
            street: "123 Maple St",
            city: "San Diego",
            state: "CA",
            postalCode: "92101",
            country: "USA"
        },
        username: "noahbrown_ca92101",
        purchaseHistory: [
            {
                orderId: "ORD-20241010-019",
                orderDate: "2024-10-10",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: "FDX67890",
                items: [
                    { productId: 2, productCategory: "Wireless", quantity: 3, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Aiden Rodriguez",
        address: {
            street: "456 Oak St",
            city: "Houston",
            state: "TX",
            postalCode: "77001",
            country: "USA"
        },
        username: "aidenrodriguez_tx77001",
        purchaseHistory: [
            {
                orderId: "ORD-20241009-020",
                orderDate: "2024-10-09",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL78901",
                items: [
                    { productId: 5, productCategory: "In-ear headphone", quantity: 1, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Charlotte Lewis",
        address: {
            street: "707 Fir St",
            city: "Atlanta",
            state: "GA",
            postalCode: "30301",
            country: "USA"
        },
        username: "charlottelewis_ga30301",
        purchaseHistory: [
            {
                orderId: "ORD-20241008-021",
                orderDate: "2024-10-08",
                currency: "USD",
                status: "Cancelled",
                paymentMethod: "Credit Card",
                shippingCompany: null,
                trackingNumber: null,
                items: [
                    { productId: 31, productCategory: "In-ear headphone", quantity: 2, discount: 5 },
                    { productId: 11, productCategory: "In-ear headphone", quantity: 3, discount: 0 },
                    { productId: 37, productCategory: "Sport headphone", quantity: 3, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Liam Walker",
        address: {
            street: "404 Cedar St",
            city: "Austin",
            state: "TX",
            postalCode: "73301",
            country: "USA"
        },
        username: "liamwalker_tx73301",
        purchaseHistory: [
            {
                orderId: "ORD-20241007-022",
                orderDate: "2024-10-07",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: "FDX67890",
                items: [
                    { productId: 9, productCategory: "Wireless", quantity: 3, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Emily Anderson",
        address: {
            street: "101 Pine St",
            city: "Phoenix",
            state: "AZ",
            postalCode: "85001",
            country: "USA"
        },
        username: "emilyanderson_az85001",
        purchaseHistory: [
            {
                orderId: "ORD-20241006-023",
                orderDate: "2024-10-06",
                currency: "USD",
                status: "Shipped",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL78901",
                items: [
                    { productId: 35, productCategory: "In-ear headphone", quantity: 3, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Jack Hall",
        address: {
            street: "202 Oak St",
            city: "San Diego",
            state: "CA",
            postalCode: "92101",
            country: "USA"
        },
        username: "jackhall_ca92101",
        purchaseHistory: [
            {
                orderId: "ORD-20241005-024",
                orderDate: "2024-10-05",
                currency: "USD",
                status: "Processing",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: null,
                items: [
                    { productId: 3, productCategory: "Over-ear headphone", quantity: 3, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Elijah Robinson",
        address: {
            street: "789 Cedar St",
            city: "Phoenix",
            state: "AZ",
            postalCode: "85001",
            country: "USA"
        },
        username: "elijahrobinson_az85001",
        purchaseHistory: [
            {
                orderId: "ORD-20241004-025",
                orderDate: "2024-10-04",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: "UPS34567",
                items: [
                    { productId: 11, productCategory: "In-ear headphone", quantity: 2, discount: 0 },
                    { productId: 22, productCategory: "Wireless", quantity: 2, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "James Young",
        address: {
            street: "456 Oak St",
            city: "Miami",
            state: "FL",
            postalCode: "33101",
            country: "USA"
        },
        username: "jamesyoung_fl33101",
        purchaseHistory: [
            {
                orderId: "ORD-20241003-026",
                orderDate: "2024-10-03",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL56789",
                items: [
                    { productId: 17, productCategory: "Sport headphone", quantity: 1, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Olivia King",
        address: {
            street: "123 Maple St",
            city: "Austin",
            state: "TX",
            postalCode: "73301",
            country: "USA"
        },
        username: "oliviaking_tx73301",
        purchaseHistory: [
            {
                orderId: "ORD-20241002-027",
                orderDate: "2024-10-02",
                currency: "USD",
                status: "Shipped",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: "FDX78901",
                items: [
                    { productId: 2, productCategory: "In-ear headphone", quantity: 1, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "William Wright",
        address: {
            street: "808 Fir St",
            city: "Philadelphia",
            state: "PA",
            postalCode: "19101",
            country: "USA"
        },
        username: "williamwright_pa19101",
        purchaseHistory: [
            {
                orderId: "ORD-20241001-028",
                orderDate: "2024-10-01",
                currency: "USD",
                status: "Cancelled",
                paymentMethod: "Credit Card",
                shippingCompany: null,
                trackingNumber: null,
                items: [
                    { productId: 24, productCategory: "Wireless", quantity: 2, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Henry Martinez",
        address: {
            street: "123 Oak St",
            city: "Austin",
            state: "TX",
            postalCode: "73301",
            country: "USA"
        },
        username: "henrymartinez_tx73301",
        purchaseHistory: [
            {
                orderId: "ORD-20240930-029",
                orderDate: "2024-09-30",
                currency: "USD",
                status: "Processing",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: null,
                items: [
                    { productId: 20, productCategory: "In-ear headphone", quantity: 1, discount: 0 },
                    { productId: 18, productCategory: "Over-ear headphone", quantity: 1, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Ella Collins",
        address: {
            street: "456 Pine St",
            city: "Seattle",
            state: "WA",
            postalCode: "98101",
            country: "USA"
        },
        username: "ellacollins_wa98101",
        purchaseHistory: [
            {
                orderId: "ORD-20240929-030",
                orderDate: "2024-09-29",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL78910",
                items: [
                    { productId: 4, productCategory: "Wireless", quantity: 2, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Grace Perez",
        address: {
            street: "789 Cedar St",
            city: "San Francisco",
            state: "CA",
            postalCode: "94101",
            country: "USA"
        },
        username: "graceperez_ca94101",
        purchaseHistory: [
            {
                orderId: "ORD-20240928-031",
                orderDate: "2024-09-28",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: null,
                items: [
                    { productId: 39, productCategory: "In-ear headphone", quantity: 2, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Benjamin Scott",
        address: {
            street: "202 Maple St",
            city: "Denver",
            state: "CO",
            postalCode: "80201",
            country: "USA"
        },
        username: "benjaminscott_co80201",
        purchaseHistory: [
            {
                orderId: "ORD-20240927-032",
                orderDate: "2024-09-27",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: "UPS12345",
                items: [
                    { productId: 37, productCategory: "Sport headphone", quantity: 1, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Zoe Turner",
        address: {
            street: "404 Birch St",
            city: "Miami",
            state: "FL",
            postalCode: "33101",
            country: "USA"
        },
        username: "zoeturner_fl33101",
        purchaseHistory: [
            {
                orderId: "ORD-20240926-033",
                orderDate: "2024-09-26",
                currency: "USD",
                status: "Processing",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: null,
                items: [
                    { productId: 9, productCategory: "Wireless", quantity: 2, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Logan Mitchell",
        address: {
            street: "567 Oak St",
            city: "Austin",
            state: "TX",
            postalCode: "73301",
            country: "USA"
        },
        username: "loganmitchell_tx73301",
        purchaseHistory: [
            {
                orderId: "ORD-20240925-034",
                orderDate: "2024-09-25",
                currency: "USD",
                status: "Shipped",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL45678",
                items: [
                    { productId: 21, productCategory: "Wireless", quantity: 1, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Chloe Harris",
        address: {
            street: "123 Maple St",
            city: "Dallas",
            state: "TX",
            postalCode: "75001",
            country: "USA"
        },
        username: "chloeharris_tx75001",
        purchaseHistory: [
            {
                orderId: "ORD-20240924-035",
                orderDate: "2024-09-24",
                currency: "USD",
                status: "Cancelled",
                paymentMethod: "Credit Card",
                shippingCompany: null,
                trackingNumber: null,
                items: [
                    { productId: 30, productCategory: "Wireless", quantity: 1, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Jayden Cooper",
        address: {
            street: "789 Birch St",
            city: "San Francisco",
            state: "CA",
            postalCode: "94101",
            country: "USA"
        },
        username: "jaydencooper_ca94101",
        purchaseHistory: [
            {
                orderId: "ORD-20240923-036",
                orderDate: "2024-09-23",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: null,
                items: [
                    { productId: 10, productCategory: "Wireless", quantity: 2, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Avery King",
        address: {
            street: "456 Pine St",
            city: "Seattle",
            state: "WA",
            postalCode: "98101",
            country: "USA"
        },
        username: "averyking_wa98101",
        purchaseHistory: [
            {
                orderId: "ORD-20240922-037",
                orderDate: "2024-09-22",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL67890",
                items: [
                    { productId: 13, productCategory: "Over-ear headphone", quantity: 3, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Gabriel Parker",
        address: {
            street: "123 Oak St",
            city: "Austin",
            state: "TX",
            postalCode: "73301",
            country: "USA"
        },
        username: "gabrielparker_tx73301",
        purchaseHistory: [
            {
                orderId: "ORD-20240921-038",
                orderDate: "2024-09-21",
                currency: "USD",
                status: "Processing",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: null,
                items: [
                    { productId: 24, productCategory: "Wireless", quantity: 1, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Scarlett Adams",
        address: {
            street: "404 Pine St",
            city: "Miami",
            state: "FL",
            postalCode: "33101",
            country: "USA"
        },
        username: "scarlettadams_fl33101",
        purchaseHistory: [
            {
                orderId: "ORD-20240920-039",
                orderDate: "2024-09-20",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: "UPS56789",
                items: [
                    { productId: 20, productCategory: "In-ear headphone", quantity: 1, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Lily Reed",
        address: {
            street: "789 Maple St",
            city: "Denver",
            state: "CO",
            postalCode: "80201",
            country: "USA"
        },
        username: "lilyreed_co80201",
        purchaseHistory: [
            {
                orderId: "ORD-20240919-040",
                orderDate: "2024-09-19",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: null,
                items: [
                    { productId: 25, productCategory: "In-ear headphone", quantity: 3, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Elijah Bailey",
        address: {
            street: "456 Oak St",
            city: "Miami",
            state: "FL",
            postalCode: "33101",
            country: "USA"
        },
        username: "elijahbailey_fl33101",
        purchaseHistory: [
            {
                orderId: "ORD-20240918-041",
                orderDate: "2024-09-18",
                currency: "USD",
                status: "Shipped",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL12345",
                items: [
                    { productId: 25, productCategory: "In-ear headphone", quantity: 2, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Sofia Rivera",
        address: {
            street: "808 Cedar St",
            city: "Austin",
            state: "TX",
            postalCode: "73301",
            country: "USA"
        },
        username: "sofiarivera_tx73301",
        purchaseHistory: [
            {
                orderId: "ORD-20240917-042",
                orderDate: "2024-09-17",
                currency: "USD",
                status: "Cancelled",
                paymentMethod: "Credit Card",
                shippingCompany: null,
                trackingNumber: null,
                items: [
                    { productId: 29, productCategory: "Wireless", quantity: 1, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Wyatt Murphy",
        address: {
            street: "123 Elm St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA"
        },
        username: "wyattmurphy_ny10001",
        purchaseHistory: [
            {
                orderId: "ORD-20240916-043",
                orderDate: "2024-09-16",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: null,
                items: [
                    { productId: 23, productCategory: "In-ear headphone", quantity: 3, discount: 5 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Hannah Ramirez",
        address: {
            street: "456 Elm St",
            city: "Austin",
            state: "TX",
            postalCode: "73301",
            country: "USA"
        },
        username: "hannahramirez_tx73301",
        purchaseHistory: [
            {
                orderId: "ORD-20240915-044",
                orderDate: "2024-09-15",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: "FDX56789",
                items: [
                    { productId: 29, productCategory: "Wireless", quantity: 1, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Luke Howard",
        address: {
            street: "789 Oak St",
            city: "Seattle",
            state: "WA",
            postalCode: "98101",
            country: "USA"
        },
        username: "lukehoward_wa98101",
        purchaseHistory: [
            {
                orderId: "ORD-20240914-045",
                orderDate: "2024-09-14",
                currency: "USD",
                status: "Processing",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: null,
                items: [
                    { productId: 35, productCategory: "In-ear headphone", quantity: 3, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Layla Morris",
        address: {
            street: "456 Maple St",
            city: "Miami",
            state: "FL",
            postalCode: "33101",
            country: "USA"
        },
        username: "laylamorris_fl33101",
        purchaseHistory: [
            {
                orderId: "ORD-20240913-046",
                orderDate: "2024-09-13",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "FedEx",
                trackingNumber: null,
                items: [
                    { productId: 33, productCategory: "Over-ear headphone", quantity: 1, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Dylan Cook",
        address: {
            street: "123 Cedar St",
            city: "Denver",
            state: "CO",
            postalCode: "80201",
            country: "USA"
        },
        username: "dylancook_co80201",
        purchaseHistory: [
            {
                orderId: "ORD-20240912-047",
                orderDate: "2024-09-12",
                currency: "USD",
                status: "Shipped",
                paymentMethod: "Credit Card",
                shippingCompany: "UPS",
                trackingNumber: "UPS78910",
                items: [
                    { productId: 40, productCategory: "Over-ear headphone", quantity: 3, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Evelyn Gray",
        address: {
            street: "567 Oak St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA"
        },
        username: "evelyngray_ny10001",
        purchaseHistory: [
            {
                orderId: "ORD-20240911-048",
                orderDate: "2024-09-11",
                currency: "USD",
                status: "Cancelled",
                paymentMethod: "Credit Card",
                shippingCompany: null,
                trackingNumber: null,
                items: [
                    { productId: 20, productCategory: "In-ear headphone", quantity: 1, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Victoria Hughes",
        address: {
            street: "123 Birch St",
            city: "Phoenix",
            state: "AZ",
            postalCode: "85001",
            country: "USA"
        },
        username: "victoriahughes_az85001",
        purchaseHistory: [
            {
                orderId: "ORD-20240910-049",
                orderDate: "2024-09-10",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL45678",
                items: [
                    { productId: 25, productCategory: "In-ear headphone", quantity: 2, discount: 10 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    },
    {
        name: "Eli Patterson",
        address: {
            street: "789 Maple St",
            city: "Los Angeles",
            state: "CA",
            postalCode: "90001",
            country: "USA"
        },
        username: "elipatterson_ca90001",
        purchaseHistory: [
            {
                orderId: "ORD-20240909-050",
                orderDate: "2024-09-09",
                currency: "USD",
                status: "Delivered",
                paymentMethod: "Credit Card",
                shippingCompany: "DHL",
                trackingNumber: "DHL12345",
                items: [
                    { productId: 35, productCategory: "In-ear headphone", quantity: 3, discount: 0 }
                ],
                totalPrice: 0
            }
        ],
        reviews: [],
        questions: []
    }

];
