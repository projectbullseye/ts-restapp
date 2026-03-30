import express, { Express, Request, Response } from 'express';
import employeeRoutes from './routes/employees';
import helloRoutes from './routes/hello';
import orderRoutes from './routes/orders';

const app: Express = express();
const port = 3000;

// Middleware
app.use(express.json());

// Root endpoint
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World!' });
});

// Hello routes
app.use('/api/hello', helloRoutes);

// Employee routes
app.use('/api/employees', employeeRoutes);

// Order routes
app.use('/api/orders', orderRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
