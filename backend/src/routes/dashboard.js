import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/summary', async (_req, res) => {
  try {
    const [propertyCount, tenantCount, invoiceCount, maintenanceCount, totalOutstanding] = await Promise.all([
      prisma.property.count(),
      prisma.tenant.count(),
      prisma.invoice.count(),
      prisma.maintenanceRequest.count(),
      prisma.invoice.aggregate({
        _sum: { outstandingBalance: true },
      }),
    ]);

    res.json({
      propertyCount,
      tenantCount,
      invoiceCount,
      maintenanceCount,
      totalOutstanding: totalOutstanding._sum.outstandingBalance || 0,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard summary', error: error.message });
  }
});

export default router;
