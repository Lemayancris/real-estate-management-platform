# Backend API overview

This backend provides the core data access layer for the real-estate platform, including property management, tenant records, billing and payment tracking, maintenance workflows, and operational dashboards.

## Routes

- GET `/api/health`
- GET `/api/properties`
- GET `/api/tenants`
- GET `/api/invoices`
- GET `/api/dashboard/summary`

## Run locally

```bash
cd backend
npm install
cp .env.example .env
node server.js
```
