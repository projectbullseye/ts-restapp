import pool from '../config/database';
import { Order } from '../models/Order';

export class OrderRepository {
    async getAll(): Promise<Order[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM orders ORDER BY orderDate DESC');
            return (rows as any[]).map(row => ({
                ...row,
                orderDate: new Date(row.orderDate)
            }));
        } finally {
            connection.release();
        }
    }

    async getById(id: number): Promise<Order | null> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM orders WHERE id = ?', [id]);
            const orders = rows as any[];
            if (orders.length > 0) {
                return {
                    ...orders[0],
                    orderDate: new Date(orders[0].orderDate)
                };
            }
            return null;
        } finally {
            connection.release();
        }
    }

    async create(order: Omit<Order, 'id' | 'orderDate'>): Promise<Order> {
        const connection = await pool.getConnection();
        try {
            const orderDate = new Date();
            const [result] = await connection.query(
                'INSERT INTO orders (customerName, customerEmail, productName, quantity, totalAmount, status, orderDate) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [order.customerName, order.customerEmail, order.productName, order.quantity, order.totalAmount, order.status, orderDate]
            );
            const insertResult = result as any;
            return {
                id: insertResult.insertId,
                ...order,
                orderDate
            };
        } finally {
            connection.release();
        }
    }

    async update(id: number, order: Partial<Omit<Order, 'id' | 'orderDate'>>): Promise<Order | null> {
        const connection = await pool.getConnection();
        try {
            const currentOrder = await this.getById(id);
            if (!currentOrder) {
                return null;
            }

            const fields: string[] = [];
            const values: any[] = [];

            if (order.customerName !== undefined) {
                fields.push('customerName = ?');
                values.push(order.customerName);
            }
            if (order.customerEmail !== undefined) {
                fields.push('customerEmail = ?');
                values.push(order.customerEmail);
            }
            if (order.productName !== undefined) {
                fields.push('productName = ?');
                values.push(order.productName);
            }
            if (order.quantity !== undefined) {
                fields.push('quantity = ?');
                values.push(order.quantity);
            }
            if (order.totalAmount !== undefined) {
                fields.push('totalAmount = ?');
                values.push(order.totalAmount);
            }
            if (order.status !== undefined) {
                fields.push('status = ?');
                values.push(order.status);
            }

            if (fields.length === 0) {
                return currentOrder;
            }

            values.push(id);
            const query = `UPDATE orders SET ${fields.join(', ')} WHERE id = ?`;
            await connection.query(query, values);

            return { ...currentOrder, ...order };
        } finally {
            connection.release();
        }
    }

    async delete(id: number): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query('DELETE FROM orders WHERE id = ?', [id]);
            const deleteResult = result as any;
            return deleteResult.affectedRows > 0;
        } finally {
            connection.release();
        }
    }

    async getByStatus(status: string): Promise<Order[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM orders WHERE status = ? ORDER BY orderDate DESC', [status]);
            return (rows as any[]).map(row => ({
                ...row,
                orderDate: new Date(row.orderDate)
            }));
        } finally {
            connection.release();
        }
    }

    async getByCustomerEmail(email: string): Promise<Order[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM orders WHERE customerEmail = ? ORDER BY orderDate DESC', [email]);
            return (rows as any[]).map(row => ({
                ...row,
                orderDate: new Date(row.orderDate)
            }));
        } finally {
            connection.release();
        }
    }
}

export default new OrderRepository();
