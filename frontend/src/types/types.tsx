export interface Bill {
    id?: number;
    store: Store;
    totalAmount?: number;
    date: string;
    products: Product[];
}

export interface Store {
    id?: number;
    name: string;
    location: string;
}

export interface Product {
    id?: number;
    brand: string;
    name: string;
    price: number;
    quantity?: number;
    units: string;
    category?: string;
}

export interface ProductPrice {
    brand: string;
    name: string;
    productId: number;
    storeId: number;
    price: number;
    date: string;
    quantity: number;
    units: string;
}

export interface Brand {
    brand: string
}

export interface MonthSpend {
    name: string;
    amount: string;
}

export interface spendByCategory{
    yearMonth: string,
    amount: number,
    category: string
}