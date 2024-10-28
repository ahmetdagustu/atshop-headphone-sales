// orders.js

const orders = [
    {
      orderId: "ORD-20241028-001",
      customerName: "John Doe",
      orderDate: "2024-10-28",
      totalPrice: 737,  // 386 * 1 + 351 * 1
      status: "Delivered",
      items: [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 1
        }
      ]
    },
    {
      orderId: "ORD-20241027-002",
      customerName: "Emily Clark",
      orderDate: "2024-10-27",
      totalPrice: 772,  // 386 * 2
      status: "Processing",
      items: [
        {
          productId: 1,
          quantity: 2
        }
      ]
    },
    {
      orderId: "ORD-20241026-003",
      customerName: "Michael Johnson",
      orderDate: "2024-10-26",
      totalPrice: 1158,  // 386 * 3
      status: "Shipped",
      items: [
        {
          productId: 1,
          quantity: 3
        }
      ]
    },
    {
      orderId: "ORD-20241025-004",
      customerName: "Sarah Lee",
      orderDate: "2024-10-25",
      totalPrice: 737,  // 386 * 1 + 351 * 1
      status: "Cancelled",
      items: [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 1
        }
      ]
    },
    {
      orderId: "ORD-20241024-005",
      customerName: "David Smith",
      orderDate: "2024-10-24",
      totalPrice: 1123,  // 386 * 2 + 351 * 1
      status: "Delivered",
      items: [
        {
          productId: 1,
          quantity: 2
        },
        {
          productId: 2,
          quantity: 1
        }
      ]
    },
    {
      orderId: "ORD-20241023-006",
      customerName: "Laura Miller",
      orderDate: "2024-10-23",
      totalPrice: 386,  // 386 * 1
      status: "Completed",
      items: [
        {
          productId: 1,
          quantity: 1
        }
      ]
    },
    {
      orderId: "ORD-20241022-007",
      customerName: "James Wilson",
      orderDate: "2024-10-22",
      totalPrice: 772,  // 386 * 2
      status: "Processing",
      items: [
        {
          productId: 1,
          quantity: 2
        }
      ]
    },
    {
      orderId: "ORD-20241021-008",
      customerName: "Robert Taylor",
      orderDate: "2024-10-21",
      totalPrice: 737,  // 386 * 1 + 351 * 1
      status: "Delivered",
      items: [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 1
        }
      ]
    },
    {
      orderId: "ORD-20241020-009",
      customerName: "Emma Davis",
      orderDate: "2024-10-20",
      totalPrice: 1158,  // 386 * 3
      status: "Shipped",
      items: [
        {
          productId: 1,
          quantity: 3
        }
      ]
    },
    {
      orderId: "ORD-20241019-010",
      customerName: "Daniel Brown",
      orderDate: "2024-10-19",
      totalPrice: 737,  // 386 * 1 + 351 * 1
      status: "Completed",
      items: [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 1
        }
      ]
    }
  ];
  
  // Export the array for use in other modules
  export default orders;
  