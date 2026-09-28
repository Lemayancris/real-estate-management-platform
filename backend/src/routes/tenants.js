import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const tenants = await prisma.tenant.findMany({
      include: {
        user: true,
        unit: true,
        property: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tenants', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.params.id },
      include: {
        user: true,
        unit: true,
        property: true,
        leases: true,
      },
    });

    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    return res.json(tenant);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch tenant', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, role = 'TENANT', propertyId, unitId, monthlyRent, deposit, serviceCharge } = req.body;

    if (!fullName) {
      return res.status(400).json({ message: 'fullName is required' });
    }

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        role,
      },
    });

    const tenant = await prisma.tenant.create({
      data: {
        userId: user.id,
        propertyId,
        unitId,
        monthlyRent,
        deposit,
        serviceCharge,
      },
      include: { user: true, property: true, unit: true },
    });

    return res.status(201).json(tenant);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create tenant', error: error.message });
  }
});

export default router;
