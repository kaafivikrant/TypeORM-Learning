import express from 'express';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client';

const router = express.Router();

router.get('/api/client', async (req, res) => {
    const client = await createQueryBuilder(
        'client'
    )
    .select(['client.id', 'client.first_name','client.last_name' ,'client.email'])
    .addSelect('client.created_at')
    .from(Client, 'client')
    .where('client.id = :clientId', { clientId: 4 })
    .getOne();

    return res.json(client);
});

export {router as fetchClientRouter}; 