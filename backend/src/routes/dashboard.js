import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        tenant: { include: { user: true } },
        unit: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch invoices',
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
      include: {
        tenant: { include: { user: true } },
        unit: true,
        payments: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    return res.json(invoice);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch invoice',
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      tenantId,
      unitId,
      billingPeriodStart,
      billingPeriodEnd,
      dueDate,
      rent,
      serviceCharge,
      water,
      garbage,
      otherCharges,
      previousBalance,
    } = req.body;

    if (!tenantId || !unitId || !billingPeriodStart || !billingPeriodEnd || !dueDate || !rent) {
      return res.status(400).json({ message: 'Required fields missing for invoice creation' });
    }

    const invoiceNumber = `INV-${Date.now()}`;
    const amount = Number(rent || 0);
    const service = Number(serviceCharge || 0);
    const waterAmount = Number(water || 0);
    const garbageAmount = Number(garbage || 0);
    const other = Number(otherCharges || 0);
    const prevBalance = Number(previousBalance || 0);

    const outstandingBalance = amount + service + waterAmount + garbageAmount + other + prevBalance;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        tenantId,
        unitId,
        billingPeriodStart: new Date(billingPeriodStart),
        billingPeriodEnd: new Date(billingPeriodEnd),
        dueDate: new Date(dueDate),
        rent: amount,
        serviceCharge: service,
        water: waterAmount,
        garbage: garbageAmount,
        otherCharges: other,
        previousBalance: prevBalance,
        amountPaid: 0,
        outstandingBalance,
        status: 'SENT',
      },
    });

    return res.status(201).json(invoice);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create invoice',
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
