# Real Estate Database Foundation

This module sets up the relational foundation for the Kenyan real estate platform. It includes a PostgreSQL-backed schema, Prisma ORM configuration, environment variables, and seed data for a realistic starter dataset.

## Included

- `prisma/schema.prisma` — full core database schema
- `prisma/seed.ts` — starter data for estates, buildings, units, tenants, and leads
- `.env.example` — PostgreSQL configuration and service settings
- `docker-compose.yml` — local PostgreSQL service for development
- package updates for Prisma tooling

## Quick start

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
```

Then open Prisma Studio with:

```bash
npx prisma studio
```

## Core domain coverage

- Properties, blocks, floors, and units
- Owner, buyer, tenant, agent, and admin users
- Leasing, rent billing, receipts, and arrears
- Service charge and utility billing
- Maintenance tickets and property lifecycle events
- Website leads, reservations, and property sales
- M-Pesa and payment tracking
- Uploadable tenant and property documents

## Recommended stack

- PostgreSQL 16
- Prisma ORM
- TypeScript
- Next.js app as the user-facing layer
