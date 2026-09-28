import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma.js';
import propertiesRouter from './routes/properties.js';
import tenantsRouter from './routes/tenants.js';
import billingRouter from './routes/billing.js';
import dashboardRouter from './routes/dashboard.js';
import paymentsRouter from './routes/payments.js';
import maintenanceRouter from './routes/maintenance.js';
import leadsRouter from './routes/leads.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

app.use('/api/properties', propertiesRouter);
app.use('/api/tenants', tenantsRouter);
app.use('/api/invoices', billingRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/maintenance', maintenanceRouter);
app.use('/api/leads', leadsRouter);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
