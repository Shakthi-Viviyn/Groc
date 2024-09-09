export interface Bill {
    id: number;
    storeName: string;
    location: string;
    totalAmount: number;
    date: string;
    products: Product[];
}

export interface Product {
    id: number;
    brand: string;
    name: string;
    price: number;
    quantity: number;
    units: string;
    category: string;
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