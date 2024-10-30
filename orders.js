const orders = [
    {
      orderId: "ORD-20241028-001",
      customerName: "John Doe",
      orderDate: "2024-10-28",
      totalPrice: 737,  // 386 * 1 + 351 * 1
      status: "Delivered",
      shippingCompany: "DHL", 
      invoiceUploaded: false,
      deliveryDate: "2024-11-01",
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
      invoiceUploaded: true,
      shippingCompany: "DHL", 
      deliveryDate: "",
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
      shippingCompany: "DHL", 
      invoiceUploaded: false,
      deliveryDate: "2024-09-12",
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
    },
    {
      orderId: "ORD-20241018-011",
      customerName: "Sophia Harris",
      orderDate: "2024-10-18",
      totalPrice: 772,  // 386 * 2
      status: "Shipped",
      items: [
          { productId: 1, quantity: 2 }
      ]
  },
  {
      orderId: "ORD-20241017-012",
      customerName: "Oliver Martinez",
      orderDate: "2024-10-17",
      totalPrice: 737,  // 386 * 1 + 351 * 1
      status: "Delivered",
      items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20241016-013",
      customerName: "Ava Thomas",
      orderDate: "2024-10-16",
      totalPrice: 1158,  // 386 * 3
      status: "Cancelled",
      items: [
          { productId: 1, quantity: 3 }
      ]
  },
  {
      orderId: "ORD-20241015-014",
      customerName: "Isabella Garcia",
      orderDate: "2024-10-15",
      totalPrice: 386,  // 386 * 1
      status: "Processing",
      items: [
          { productId: 1, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20241014-015",
      customerName: "Ethan White",
      orderDate: "2024-10-14",
      totalPrice: 1123,  // 386 * 2 + 351 * 1
      status: "Delivered",
      items: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20241013-016",
      customerName: "Mia Harris",
      orderDate: "2024-10-13",
      totalPrice: 772,  // 386 * 2
      status: "Completed",
      items: [
          { productId: 1, quantity: 2 }
      ]
  },
  {
      orderId: "ORD-20241012-017",
      customerName: "Lucas Clark",
      orderDate: "2024-10-12",
      totalPrice: 737,  // 386 * 1 + 351 * 1
      status: "Shipped",
      items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20241011-018",
      customerName: "Amelia Johnson",
      orderDate: "2024-10-11",
      totalPrice: 1158,  // 386 * 3
      status: "Processing",
      items: [
          { productId: 1, quantity: 3 }
      ]
  },
  {
      orderId: "ORD-20241010-019",
      customerName: "Noah Brown",
      orderDate: "2024-10-10",
      totalPrice: 386,  // 386 * 1
      status: "Delivered",
      items: [
          { productId: 1, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20241009-020",
      customerName: "Aiden Rodriguez",
      orderDate: "2024-10-09",
      totalPrice: 737,  // 386 * 1 + 351 * 1
      status: "Completed",
      items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20241008-021",
      customerName: "Charlotte Lewis",
      orderDate: "2024-10-08",
      totalPrice: 772,  // 386 * 2
      status: "Cancelled",
      items: [
          { productId: 1, quantity: 2 }
      ]
  },
  {
      orderId: "ORD-20241007-022",
      customerName: "Liam Walker",
      orderDate: "2024-10-07",
      totalPrice: 386,  // 386 * 1
      status: "Delivered",
      items: [
          { productId: 1, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20241006-023",
      customerName: "Emily Anderson",
      orderDate: "2024-10-06",
      totalPrice: 1123,  // 386 * 2 + 351 * 1
      status: "Shipped",
      items: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20241005-024",
      customerName: "Jack Hall",
      orderDate: "2024-10-05",
      totalPrice: 737,  // 386 * 1 + 351 * 1
      status: "Processing",
      items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20241004-025",
      customerName: "Elijah Robinson",
      orderDate: "2024-10-04",
      totalPrice: 772,  // 386 * 2
      status: "Completed",
      items: [
          { productId: 1, quantity: 2 }
      ]
  },
  {
      orderId: "ORD-20241003-026",
      customerName: "James Young",
      orderDate: "2024-10-03",
      totalPrice: 1158,  // 386 * 3
      status: "Delivered",
      items: [
          { productId: 1, quantity: 3 }
      ]
  },
  {
      orderId: "ORD-20241002-027",
      customerName: "Olivia King",
      orderDate: "2024-10-02",
      totalPrice: 386,  // 386 * 1
      status: "Shipped",
      items: [
          { productId: 1, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20241001-028",
      customerName: "William Wright",
      orderDate: "2024-10-01",
      totalPrice: 737,  // 386 * 1 + 351 * 1
      status: "Cancelled",
      items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 1 }
      ]
  },
  {
      orderId: "ORD-20240930-029",
      customerName: "Henry Martinez",
      orderDate: "2024-09-30",
      totalPrice: 772,  // 386 * 2
      status: "Processing",
      items: [
          { productId: 1, quantity: 2 }
      ]
  },
  {
      orderId: "ORD-20240929-030",
      customerName: "Ella Collins",
      orderDate: "2024-09-29",
      totalPrice: 1158,  // 386 * 3
      status: "Delivered",
      items: [
          { productId: 1, quantity: 3 }
      ]
  },
  {
    orderId: "ORD-20240928-031",
    customerName: "Grace Perez",
    orderDate: "2024-09-28",
    totalPrice: 386,  // 386 * 1
    status: "Completed",
    items: [
        { productId: 1, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240927-032",
    customerName: "Benjamin Scott",
    orderDate: "2024-09-27",
    totalPrice: 737,  // 386 * 1 + 351 * 1
    status: "Delivered",
    items: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240926-033",
    customerName: "Zoe Turner",
    orderDate: "2024-09-26",
    totalPrice: 772,  // 386 * 2
    status: "Processing",
    items: [
        { productId: 1, quantity: 2 }
    ]
},
{
    orderId: "ORD-20240925-034",
    customerName: "Logan Mitchell",
    orderDate: "2024-09-25",
    totalPrice: 1123,  // 386 * 2 + 351 * 1
    status: "Shipped",
    items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240924-035",
    customerName: "Chloe Harris",
    orderDate: "2024-09-24",
    totalPrice: 1158,  // 386 * 3
    status: "Cancelled",
    items: [
        { productId: 1, quantity: 3 }
    ]
},
{
    orderId: "ORD-20240923-036",
    customerName: "Jayden Cooper",
    orderDate: "2024-09-23",
    totalPrice: 386,  // 386 * 1
    status: "Completed",
    items: [
        { productId: 1, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240922-037",
    customerName: "Avery King",
    orderDate: "2024-09-22",
    totalPrice: 737,  // 386 * 1 + 351 * 1
    status: "Delivered",
    items: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240921-038",
    customerName: "Gabriel Parker",
    orderDate: "2024-09-21",
    totalPrice: 772,  // 386 * 2
    status: "Processing",
    items: [
        { productId: 1, quantity: 2 }
    ]
},
{
    orderId: "ORD-20240920-039",
    customerName: "Scarlett Adams",
    orderDate: "2024-09-20",
    totalPrice: 1158,  // 386 * 3
    status: "Delivered",
    items: [
        { productId: 1, quantity: 3 }
    ]
},
{
    orderId: "ORD-20240919-040",
    customerName: "Lily Reed",
    orderDate: "2024-09-19",
    totalPrice: 386,  // 386 * 1
    status: "Completed",
    items: [
        { productId: 1, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240918-041",
    customerName: "Elijah Bailey",
    orderDate: "2024-09-18",
    totalPrice: 737,  // 386 * 1 + 351 * 1
    status: "Shipped",
    items: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240917-042",
    customerName: "Sofia Rivera",
    orderDate: "2024-09-17",
    totalPrice: 772,  // 386 * 2
    status: "Cancelled",
    items: [
        { productId: 1, quantity: 2 }
    ]
},
{
    orderId: "ORD-20240916-043",
    customerName: "Wyatt Murphy",
    orderDate: "2024-09-16",
    totalPrice: 1123,  // 386 * 2 + 351 * 1
    status: "Completed",
    items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240915-044",
    customerName: "Hannah Ramirez",
    orderDate: "2024-09-15",
    totalPrice: 386,  // 386 * 1
    status: "Delivered",
    items: [
        { productId: 1, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240914-045",
    customerName: "Luke Howard",
    orderDate: "2024-09-14",
    totalPrice: 737,  // 386 * 1 + 351 * 1
    status: "Processing",
    items: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240913-046",
    customerName: "Layla Morris",
    orderDate: "2024-09-13",
    totalPrice: 1158,  // 386 * 3
    status: "Completed",
    items: [
        { productId: 1, quantity: 3 }
    ]
},
{
    orderId: "ORD-20240912-047",
    customerName: "Dylan Cook",
    orderDate: "2024-09-12",
    totalPrice: 386,  // 386 * 1
    status: "Shipped",
    items: [
        { productId: 1, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240911-048",
    customerName: "Evelyn Gray",
    orderDate: "2024-09-11",
    totalPrice: 737,  // 386 * 1 + 351 * 1
    status: "Cancelled",
    items: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 1 }
    ]
},
{
    orderId: "ORD-20240910-049",
    customerName: "Victoria Hughes",
    orderDate: "2024-09-10",
    totalPrice: 772,  // 386 * 2
    status: "Delivered",
    items: [
        { productId: 1, quantity: 2 }
    ]
},
{
  orderId: "ORD-20240909-050",
  customerName: "Eli Patterson",
  orderDate: "2024-09-09",
  totalPrice: 1158,  // 386 * 3
  status: "Completed",
  shippingCompany: "DHL",  // Add shipping company here
  items: [
      { productId: 1, quantity: 3 }
  ]
}

  ];
  
  // Export the array for use in other modules
  export default orders;
  
  



// Function to add dates based on status
function addStatusBasedDates(orders) {
  orders.forEach(order => {
      const orderDate = new Date(order.orderDate);

      switch (order.status) {
          case "Completed":
              const deliveryDate = new Date(orderDate);
              deliveryDate.setDate(orderDate.getDate() + 5);
              order.deliveryDate = deliveryDate.toISOString().split('T')[0];
              break;

          case "Processing":
              const estimatedShippingDate = new Date(orderDate);
              estimatedShippingDate.setDate(orderDate.getDate() + 1);
              order.estimatedShippingDate = estimatedShippingDate.toISOString().split('T')[0];
              break;

          case "Shipped":
              const estimatedDeliveryDate = new Date(orderDate);
              estimatedDeliveryDate.setDate(orderDate.getDate() + 4);
              order.estimatedDeliveryDate = estimatedDeliveryDate.toISOString().split('T')[0];
              break;
      }
  });
}

// Run the function
addStatusBasedDates(orders);
