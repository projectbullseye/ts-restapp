import { Request, Response, Router } from 'express';
import employeeRepository from '../repositories/EmployeeRepository';

const router = Router();

// GET all employees
router.get('/', async (req: Request, res: Response) => {
    try {
        const employees = await employeeRepository.getAll();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// GET employee by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const employee = await employeeRepository.getById(id);

        if (!employee) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
});

// POST create new employee
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, email, position, department } = req.body;

        // Validation
        if (!name || !email || !position || !department) {
            res.status(400).json({
                error: 'Name, email, position, and department are required'
            });
            return;
        }

        const newEmployee = await employeeRepository.create({
            name,
            email,
            position,
            department
        });

        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Failed to create employee' });
    }
});

// PUT update employee
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name, email, position, department } = req.body;

        const employee = await employeeRepository.update(id, {
            name,
            email,
            position,
            department
        });

        if (!employee) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        res.json(employee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Failed to update employee' });
    }
});

// DELETE employee
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const employee = await employeeRepository.getById(id);

        if (!employee) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        const deleted = await employeeRepository.delete(id);

        if (deleted) {
            res.json({
                message: 'Employee deleted successfully',
                employee
            });
        } else {
            res.status(500).json({ error: 'Failed to delete employee' });
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});

export default router;
