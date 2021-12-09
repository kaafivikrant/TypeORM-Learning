import express from 'express';
import { Client } from '../entities/Client';

const router = express.Router();

router.delete('/api/client/:id', async (req, res) => {
    const clientId = req.params.id;
    await Client.delete(parseInt(clientId));
    return res.json({
        success: true,
        message: 'Client deleted successfully'
    });
});

export { router as deleteClientRouter };
