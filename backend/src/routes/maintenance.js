import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.post('/mpesa/initiate', async (req, res) => {
  try {
    const { phoneNumber, amount, invoiceId, tenantId } = req.body;

    if (!phoneNumber || !amount || !invoiceId) {
      return res.status(400).json({
        message: 'phoneNumber, amount and invoiceId are required',
      });
    }

    if (!tenantId) {
      return res.status(400).json({ message: 'tenantId is required' });
    }

    const paymentReference = `MPESA-${Date.now()}`;

    const payment = await prisma.payment.create({
      data: {
        invoiceId,
        tenantId,
        amount: Number(amount),
        channel: 'MPESA',
        reference: paymentReference,
        status: 'PENDING',
      },
    });

    return res.status(202).json({
      message: 'M-Pesa payment initiation accepted',
      payment,
      reference: paymentReference,
      stubMode: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to initiate M-Pesa payment',
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
