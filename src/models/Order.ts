export interface Order {
    id: number;
    customerName: string;
    customerEmail: string;
    productName: string;
    quantity: number;
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    orderDate: Date;
}
