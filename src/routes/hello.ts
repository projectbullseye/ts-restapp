import { Request, Response, Router } from 'express';

const router = Router();

// GET hello world
router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello World from REST API',
        timestamp: new Date().toISOString()
    });
});

// GET hello with name parameter
router.get('/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    res.json({
        message: `Hello ${name}!`,
        timestamp: new Date().toISOString()
    });
});

// POST hello with name in body
router.post('/', (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }

    res.json({
        message: `Hello ${name}!`,
        timestamp: new Date().toISOString()
    });
});

export default router;
