import { Discount } from './Discount'; 

export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface Customer {
    isLoggedIn: boolean;
    name: string;
    address: Address;
}

export interface Shipping {
    company: string | null;
    trackingNumber: string | null;
    estimatedShippingDate: string | null;
    estimatedDeliveryDate: string | null;
    deliveryDate: string | null;
}

export interface Invoice {
    uploaded: boolean;
    url: string | null;
}

export interface Cancellation {
    date: string | null;
    reason: string | null;
}

export interface OrderItem {
    productId: number;
    productCategory: string;
    quantity: number;
    unitPrice?: number;
}

export interface Order {
    orderId: string;
    orderDate: string;
    currency: string;
    totalPrice: number;
    status: string;
    paymentMethod: string;
    customer: Customer;
    shipping: {
        company: string | null;
        trackingNumber: string | null;
        estimatedShippingDate?: string | null;
        estimatedDeliveryDate?: string | null;
        deliveryDate?: string | null; // Yeni alan eklendi
    };
    invoice: Invoice;
    cancellation: Cancellation;
    discount?: Discount;
    appliedDiscountType?: string;
    items: OrderItem[];
}




export interface Item {
    productId: number;
    productCategory: string;
    quantity: number;
    discount: number;
}