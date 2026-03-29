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

-- Insert sample data
INSERT INTO employees (name, email, position, department) VALUES
('John Doe', 'john.doe@example.com', 'Software Engineer', 'Engineering'),
('Jane Smith', 'jane.smith@example.com', 'Product Manager', 'Product');
