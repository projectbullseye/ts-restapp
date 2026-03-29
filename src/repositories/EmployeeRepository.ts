import pool from '../config/database';
import { Employee } from '../models/Employee';

export class EmployeeRepository {
    async getAll(): Promise<Employee[]> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM employees');
            return rows as Employee[];
        } finally {
            connection.release();
        }
    }

    async getById(id: number): Promise<Employee | null> {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM employees WHERE id = ?', [id]);
            const employees = rows as Employee[];
            return employees.length > 0 ? employees[0] : null;
        } finally {
            connection.release();
        }
    }

    async create(employee: Omit<Employee, 'id'>): Promise<Employee> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query(
                'INSERT INTO employees (name, email, position, department) VALUES (?, ?, ?, ?)',
                [employee.name, employee.email, employee.position, employee.department]
            );
            const insertResult = result as any;
            return {
                id: insertResult.insertId,
                ...employee
            };
        } finally {
            connection.release();
        }
    }

    async update(id: number, employee: Partial<Omit<Employee, 'id'>>): Promise<Employee | null> {
        const connection = await pool.getConnection();
        try {
            const currentEmployee = await this.getById(id);
            if (!currentEmployee) {
                return null;
            }

            const fields: string[] = [];
            const values: any[] = [];

            if (employee.name) {
                fields.push('name = ?');
                values.push(employee.name);
            }
            if (employee.email) {
                fields.push('email = ?');
                values.push(employee.email);
            }
            if (employee.position) {
                fields.push('position = ?');
                values.push(employee.position);
            }
            if (employee.department) {
                fields.push('department = ?');
                values.push(employee.department);
            }

            if (fields.length === 0) {
                return currentEmployee;
            }

            values.push(id);
            const query = `UPDATE employees SET ${fields.join(', ')} WHERE id = ?`;
            await connection.query(query, values);

            return { ...currentEmployee, ...employee };
        } finally {
            connection.release();
        }
    }

    async delete(id: number): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query('DELETE FROM employees WHERE id = ?', [id]);
            const deleteResult = result as any;
            return deleteResult.affectedRows > 0;
        } finally {
            connection.release();
        }
    }
}

export default new EmployeeRepository();
