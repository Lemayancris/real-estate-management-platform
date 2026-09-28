import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const tickets = await prisma.maintenanceRequest.findMany({
      include: {
        unit: true,
        tenant: { include: { user: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch maintenance tickets',
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { unitId, tenantId, requestType, description, priority = 'Medium' } = req.body;

    if (!unitId || !requestType || !description) {
      return res.status(400).json({
        message: 'unitId, requestType and description are required',
      });
    }

    const ticket = await prisma.maintenanceRequest.create({
      data: {
        unitId,
        tenantId,
        requestType,
        description,
        priority,
        status: 'OPEN',
      },
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create maintenance ticket',
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
