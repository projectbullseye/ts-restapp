# TypeScript REST App

A simple "Hello World" REST API built with Express and TypeScript.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL Server (v5.7 or higher)

### Database Setup

1. Create the database and tables using the provided SQL script:

```bash
mysql -u root -p < database/init.sql
```

2. Copy `.env.example` to `.env` and update with your database credentials:

```bash
cp .env.example .env
```

3. Edit `.env` with your MySQL connection details:

```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employees_db
```

4. Do not commit `.env` to source control (already in `.gitignore`).

5. For production, use your platform’s secret management (e.g., AWS Secrets Manager, Azure Key Vault, Kubernetes secret, etc.) and set environment variables accordingly.

### Installation

```bash
npm install
```

### Development

Run the app with auto-reload using ts-node:

```bash
npm run dev
```

### Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

### Production

Start the compiled application:

```bash
npm start
```

## API Endpoints

### GET /
Returns a simple hello world message.

```bash
curl http://localhost:3000/
```

Response:
```json
{ "message": "Hello World!" }
```

### GET /api/hello
Returns a hello world message with a timestamp.

```bash
curl http://localhost:3000/api/hello
```

Response:
```json
{
  "message": "Hello World from REST API",
  "timestamp": "2024-03-29T10:30:00.000Z"
}
```

### GET /api/hello/:name
Returns a greeting for a specific name.

```bash
curl http://localhost:3000/api/hello/Alice
```

Response:
```json
{
  "message": "Hello Alice!",
  "timestamp": "2024-03-29T10:30:00.000Z"
}
```

### POST /api/hello
Posts a name and receives a greeting.

```bash
curl -X POST http://localhost:3000/api/hello \
  -H "Content-Type: application/json" \
  -d '{"name": "Bob"}'
```

Response:
```json
{
  "message": "Hello Bob!",
  "timestamp": "2024-03-29T10:30:00.000Z"
}
```

## Employee API Endpoints

### GET /api/employees
Returns a list of all employees.

```bash
curl http://localhost:3000/api/employees
```

Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "position": "Software Engineer",
    "department": "Engineering"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "position": "Product Manager",
    "department": "Product"
  }
]
```

### GET /api/employees/:id
Returns a specific employee by ID.

```bash
curl http://localhost:3000/api/employees/1
```

Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "position": "Software Engineer",
  "department": "Engineering"
}
```

### POST /api/employees
Creates a new employee.

```bash
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "position": "UX Designer",
    "department": "Design"
  }'
```

Response:
```json
{
  "id": 3,
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "position": "UX Designer",
  "department": "Design"
}
```

### PUT /api/employees/:id
Updates an existing employee.

```bash
curl -X PUT http://localhost:3000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "position": "Senior Software Engineer",
    "department": "Engineering"
  }'
```

Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "position": "Senior Software Engineer",
  "department": "Engineering"
}
```

### DELETE /api/employees/:id
Deletes an employee by ID.

```bash
curl -X DELETE http://localhost:3000/api/employees/1
```

Response:
```json
{
  "message": "Employee deleted successfully",
  "employee": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "position": "Senior Software Engineer",
    "department": "Engineering"
  }
}
```

## Project Structure

```
ts-restapp/
├── src/
│   └── index.ts        # Main application file
├── dist/               # Compiled JavaScript (generated after build)
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## License

ISC
# ts-restapp
