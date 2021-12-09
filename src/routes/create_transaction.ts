import express from 'express';
import { Client } from '../entities/Client';
import { Transactions, TransactionType } from "../entities/Transactions";


const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
    const { clientId } = req.params;
    const { amount, type } = req.body;
    const client = await Client.findOne(parseInt(clientId));
    if (!client) {
        return res.json({
            success: false,
            message: "Client not found"
        });
    }
    const transaction = Transactions.create({
        amount,
        type,
        client
    });
    await transaction.save();

    if(type === TransactionType.DEPOSIT) {
        client.balance += amount;
    }else if(type === TransactionType.WITHDRAW) {
        client.balance -= amount;
    }
    await client.save();
    return res.json({
        success: true,
        message: "Transaction created successfully"
    });
});

export { router as createTransactionRouter };
