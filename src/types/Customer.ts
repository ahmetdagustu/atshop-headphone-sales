
export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface Item {
    productId: number;
    productCategory: string;
    quantity: number;
    discount: number;
}

// src/types/Customer.ts

export interface Purchase {
    orderId: string;
    orderDate: string;
    currency: string;
    status: string;
    paymentMethod: string;
    shippingCompany: string | null; 
    trackingNumber: string | null;  
    items: Item[];
    totalPrice: number; 
}


export interface Customer {
    name: string;
    address: Address;
    username: string;
    purchaseHistory: Purchase[];
    reviews: any[]; 
    questions: any[];
}