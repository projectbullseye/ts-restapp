import { Request, Response, Router } from 'express';
import orderRepository from '../repositories/OrderRepository';

const router = Router();

// GET all orders
router.get('/', async (req: Request, res: Response) => {
    try {
        const { status, customerEmail } = req.query;

        let orders;
        if (status) {
            orders = await orderRepository.getByStatus(status as string);
        } else if (customerEmail) {
            orders = await orderRepository.getByCustomerEmail(customerEmail as string);
        } else {
            orders = await orderRepository.getAll();
        }

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// GET order by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const order = await orderRepository.getById(id);

        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// POST create new order
router.post('/', async (req: Request, res: Response) => {
    try {
        const { customerName, customerEmail, productName, quantity, totalAmount, status } = req.body;

        // Validation
        if (!customerName || !customerEmail || !productName || !quantity || !totalAmount) {
            res.status(400).json({
                error: 'customerName, customerEmail, productName, quantity, and totalAmount are required'
            });
            return;
        }

        if (quantity <= 0 || totalAmount <= 0) {
            res.status(400).json({
                error: 'quantity and totalAmount must be positive numbers'
            });
            return;
        }

        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        const orderStatus = status || 'pending';

        if (!validStatuses.includes(orderStatus)) {
            res.status(400).json({
                error: 'Invalid status. Must be one of: pending, processing, shipped, delivered, cancelled'
            });
            return;
        }

        const newOrder = await orderRepository.create({
            customerName,
            customerEmail,
            productName,
            quantity,
            totalAmount,
            status: orderStatus
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// PUT update order
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { customerName, customerEmail, productName, quantity, totalAmount, status } = req.body;

        // Validation for quantity and totalAmount if provided
        if (quantity !== undefined && quantity <= 0) {
            res.status(400).json({ error: 'quantity must be a positive number' });
            return;
        }

        if (totalAmount !== undefined && totalAmount <= 0) {
            res.status(400).json({ error: 'totalAmount must be a positive number' });
            return;
        }

        // Validation for status if provided
        if (status !== undefined) {
            const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
            if (!validStatuses.includes(status)) {
                res.status(400).json({
                    error: 'Invalid status. Must be one of: pending, processing, shipped, delivered, cancelled'
                });
                return;
            }
        }

        const order = await orderRepository.update(id, {
            customerName,
            customerEmail,
            productName,
            quantity,
            totalAmount,
            status
        });

        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
});

// DELETE order
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const order = await orderRepository.getById(id);

        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        const deleted = await orderRepository.delete(id);

        if (deleted) {
            res.json({
                message: 'Order deleted successfully',
                order
            });
        } else {
            res.status(500).json({ error: 'Failed to delete order' });
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

export default router;
