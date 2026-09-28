import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

app.get('/api/properties', async (_req, res) => {
  const properties = await prisma.property.findMany({
    include: {
      buildings: true,
      units: true,
    },
  });

  res.json(properties);
});

app.get('/api/tenants', async (_req, res) => {
  const tenants = await prisma.tenant.findMany({
    include: {
      user: true,
      unit: true,
      property: true,
    },
  });

  res.json(tenants);
});

app.get('/api/invoices', async (_req, res) => {
  const invoices = await prisma.invoice.findMany({
    include: {
      tenant: { include: { user: true } },
      unit: true,
    },
  });

  res.json(invoices);
});

app.get('/api/dashboard/summary', async (_req, res) => {
  const [propertyCount, tenantCount, invoiceCount, maintenanceCount] = await Promise.all([
    prisma.property.count(),
    prisma.tenant.count(),
    prisma.invoice.count(),
    prisma.maintenanceRequest.count(),
  ]);

  res.json({
    propertyCount,
    tenantCount,
    invoiceCount,
    maintenanceCount,
    generatedAt: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
