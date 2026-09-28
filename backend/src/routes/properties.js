import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        buildings: true,
        units: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: {
        buildings: true,
        units: true,
      },
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    return res.json(property);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch property', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, location, description, propertyType, developerOwner, amenities = [], status = 'ACTIVE' } = req.body;

    if (!name || !location || !description || !propertyType) {
      return res.status(400).json({ message: 'Name, location, description and propertyType are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'property';

    const property = await prisma.property.create({
      data: {
        name,
        slug,
        location,
        description,
        propertyType,
        developerOwner,
        amenities,
        status,
      },
    });

    return res.status(201).json(property);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create property', error: error.message });
  }
});

export default router;
