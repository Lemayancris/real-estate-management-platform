import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.post('/mpesa/initiate', async (req, res) => {
  try {
    const { phoneNumber, amount, invoiceId } = req.body;

    if (!phoneNumber || !amount || !invoiceId) {
      return res.status(400).json({ message: 'phoneNumber, amount and invoiceId are required' });
    }

    const paymentReference = `MPESA-${Date.now()}`;

    const payment = await prisma.payment.create({
      data: {
        invoiceId,
        tenantId: req.body.tenantId || 'placeholder-tenant-id',
        amount,
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
    return res.status(500).json({ message: 'Failed to initiate M-Pesa payment', error: error.message });
  }
});

export default router;
