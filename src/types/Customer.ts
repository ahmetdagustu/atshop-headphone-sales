
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
    shippingCompany: string | null; // Null olabilmesi için güncellendi
    trackingNumber: string | null;  // Null olabilmesi için güncellendi
    items: Item[];
    totalPrice: number; // Hesaplanacak alan
}


export interface Customer {
    name: string;
    address: Address;
    username: string;
    purchaseHistory: Purchase[];
    reviews: any[]; // Daha fazla detay eklenecekse 'Review' arayüzünü içe aktarabilirsiniz.
    questions: any[]; // Daha fazla detay eklenecekse ilgili arayüz tanımlanabilir.
}