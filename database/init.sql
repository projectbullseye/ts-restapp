-- Create employees database
CREATE DATABASE IF NOT EXISTS employees_db;
USE employees_db;

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    position VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customerName VARCHAR(255) NOT NULL,
    customerEmail VARCHAR(255) NOT NULL,
    productName VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO employees (name, email, position, department) VALUES
('John Doe', 'john.doe@example.com', 'Software Engineer', 'Engineering'),
('Jane Smith', 'jane.smith@example.com', 'Product Manager', 'Product');

-- Insert sample orders
INSERT INTO orders (customerName, customerEmail, productName, quantity, totalAmount, status) VALUES
('Alice Johnson', 'alice.johnson@example.com', 'Laptop', 1, 1299.99, 'delivered'),
('Bob Wilson', 'bob.wilson@example.com', 'Mouse', 2, 49.98, 'shipped'),
('Charlie Brown', 'charlie.brown@example.com', 'Keyboard', 1, 89.99, 'processing'),
('Diana Prince', 'diana.prince@example.com', 'Monitor', 1, 299.99, 'pending');
