import express, { Express, Request, Response } from 'express';
import employeeRoutes from './routes/employees';
import helloRoutes from './routes/hello';

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

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
