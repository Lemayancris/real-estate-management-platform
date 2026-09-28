import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.activityLog.deleteMany();
  await prisma.document.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.siteVisit.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.maintenanceRequest.deleteMany();
  await prisma.utilityBill.deleteMany();
  await prisma.serviceCharge.deleteMany();
  await prisma.receipt.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoiceLine.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.lease.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.floor.deleteMany();
  await prisma.building.deleteMany();
  await prisma.property.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.buyer.deleteMany();
  await prisma.owner.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      fullName: 'Mary Wairimu',
      email: 'admin@nairobiheights.co.ke',
      phone: '+254700111222',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  const agent = await prisma.user.create({
    data: {
      fullName: 'Kevin Mugo',
      email: 'agent@nairobiheights.co.ke',
      phone: '+254722555111',
      role: 'AGENT',
      isActive: true,
    },
  });

  const owner = await prisma.owner.create({
    data: {
      user: {
        create: {
          fullName: 'James Otieno',
          email: 'owner@nairobiheights.co.ke',
          phone: '+254711444333',
          role: 'LANDLORD',
          isActive: true,
        },
      },
    },
    include: { user: true },
  });

  const property = await prisma.property.create({
    data: {
      name: 'Kilimani Heights',
      slug: 'kilimani-heights',
      location: 'Kilimani, Nairobi',
      description: 'Premium residential apartments designed for professionals, families, and investors seeking secure, modern urban living in Nairobi.',
      propertyType: 'RESIDENTIAL',
      status: 'ACTIVE',
      developerOwner: 'Nairobi Heights Developers',
      amenities: ['Gym', 'Swimming Pool', 'Parking', 'Concierge', 'Security'],
      photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'],
      videos: ['https://example.com/kilimani-heights-tour.mp4'],
      constructionStatus: 'Completed',
      ownerId: owner.id,
    },
  });

  const building = await prisma.building.create({
    data: {
      name: 'Block A',
      propertyId: property.id,
    },
  });

  const floor = await prisma.floor.create({
    data: {
      number: 3,
      buildingId: building.id,
    },
  });

  const unit = await prisma.unit.create({
    data: {
      unitNumber: 'A3-14',
      propertyId: property.id,
      buildingId: building.id,
      floorId: floor.id,
      unitType: '3 Bedroom Apartment',
      bedrooms: 3,
      bathrooms: 3,
      sizeSqft: 1850,
      salePrice: 8900000,
      rentalPrice: 180000,
      serviceCharge: 12000,
      status: 'AVAILABLE',
      availability: 'Available',
      constructionProgress: 100,
    },
  });

  const tenantUser = await prisma.user.create({
    data: {
      fullName: 'Alice Njeri',
      email: 'alice.njeri@example.com',
      phone: '+254712345678',
      role: 'TENANT',
      isActive: true,
    },
  });

  const tenant = await prisma.tenant.create({
    data: {
      userId: tenantUser.id,
      propertyId: property.id,
      unitId: unit.id,
      emergencyContact: '+254700123456',
      leaseStartDate: new Date('2025-01-01'),
      leaseEndDate: new Date('2026-12-31'),
      monthlyRent: 180000,
      deposit: 360000,
      serviceCharge: 12000,
      waterAccount: 'W-10234',
      garbageCharges: 2000,
      outstandingBalance: 0,
    },
  });

  const lease = await prisma.lease.create({
    data: {
      tenantId: tenant.id,
      unitId: unit.id,
      leaseStart: new Date('2025-01-01'),
      leaseEnd: new Date('2026-12-31'),
      monthlyRent: 180000,
      deposit: 360000,
      serviceCharge: 12000,
      status: 'ACTIVE',
    },
  });

  const lead = await prisma.lead.create({
    data: {
      firstName: 'Brian',
      lastName: 'Kiptoo',
      email: 'brian.kiptoo@example.com',
      phone: '+254788112233',
      propertyId: property.id,
      leadSource: 'WEBSITE',
      salesStage: 'INQUIRY',
      assignedToId: agent.id,
      createdById: admin.id,
      notes: 'Interested in a 3-bedroom apartment with secure parking and a swimming pool.',
    },
  });

  await prisma.inquiry.create({
    data: {
      propertyId: property.id,
      leadId: lead.id,
      inquiryType: 'SALES',
      message: 'Asked for financing options and viewing schedule for a 3-bedroom unit.',
    },
  });

  await prisma.siteVisit.create({
    data: {
      propertyId: property.id,
      leadId: lead.id,
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      status: 'Scheduled',
      notes: 'Site visit to complete with sales agent.',
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001',
      tenantId: tenant.id,
      unitId: unit.id,
      billingPeriodStart: new Date('2026-09-01'),
      billingPeriodEnd: new Date('2026-09-30'),
      dueDate: new Date('2026-09-15'),
      status: 'SENT',
      rent: 180000,
      serviceCharge: 12000,
      water: 1800,
      garbage: 2000,
      otherCharges: 0,
      previousBalance: 0,
      amountPaid: 0,
      outstandingBalance: 195800,
      discount: 0,
      latePenalty: 0,
    },
  });

  await prisma.document.create({
    data: {
      fileName: 'alice-njeri-id.pdf',
      fileUrl: 'https://example.com/docs/alice-njeri-id.pdf',
      type: 'ID',
      mimeType: 'application/pdf',
      tenantId: tenant.id,
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: admin.id,
      action: 'SEED_DATABASE',
      entityType: 'PROPERTY',
      entityId: property.id,
      metadata: { source: 'prisma-seed' },
    },
  });

  console.log('Database seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
