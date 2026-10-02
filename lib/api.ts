import { featuredProperties, Property } from './data';

export type DashboardSummary = {
  propertyCount?: number;
  tenantCount?: number;
  invoiceCount?: number;
  maintenanceCount?: number;
  totalOutstanding?: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function getFallbackProperties(): Property[] {
  return featuredProperties;
}

function normalizeProperty(raw: any): Property {
  const normalizedStatus = String(raw?.status || 'Available');
  const statusMap: Record<string, Property['status']> = {
    ACTIVE: 'Available',
    RESERVED: 'Reserved',
    SOLD: 'Sold',
    AVAILABLE: 'Available',
    RESERVED_UNIT: 'Reserved',
    OCCUPIED: 'Reserved',
  };

  return {
    id: raw?.id || raw?.slug || 'property-1',
    name: raw?.name || 'Property',
    location: raw?.location || 'Nairobi',
    type: raw?.propertyType ? String(raw.propertyType).toLowerCase().replace(/^./, (c) => c.toUpperCase()) : 'Apartment',
    price: Number(raw?.salePrice || raw?.price || 5000000),
    bedrooms: Number(raw?.bedrooms || 2),
    bathrooms: Number(raw?.bathrooms || 2),
    area: Number(raw?.sizeSqft || raw?.area || 1200),
    status: statusMap[normalizedStatus.toUpperCase()] || 'Available',
    image: raw?.photos?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    description: raw?.description || 'Modern property in a prime location.',
    amenities: Array.isArray(raw?.amenities) && raw.amenities.length ? raw.amenities : ['Parking', 'Security', 'Internet'],
  };
}

export async function fetchProperties(): Promise<Property[]> {
  try {
    const response = await fetch(`${API_BASE}/api/properties`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    return Array.isArray(data) ? data.map(normalizeProperty) : getFallbackProperties();
  } catch {
    return getFallbackProperties();
  }
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    const response = await fetch(`${API_BASE}/api/properties/${id}`, { cache: 'no-store' });
    if (!response.ok) return null;

    const data = await response.json();
    return normalizeProperty(data);
  } catch {
    const fallback = getFallbackProperties().find((item) => item.id === id);
    return fallback || null;
  }
}

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  try {
    const response = await fetch(`${API_BASE}/api/dashboard/summary`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return await response.json();
  } catch {
    return {
      propertyCount: 248,
      tenantCount: 1482,
      invoiceCount: 620,
      maintenanceCount: 17,
      totalOutstanding: 4200000,
    };
  }
}

export const marketStats = [
  { value: '4.2K', label: 'Property views' },
  { value: '1.3K', label: 'Qualified leads' },
  { value: '91%', label: 'Sales conversion' },
];

export const activeLeads = [
  {
    title: '3-Bedroom Apartments',
    type: 'Buyers',
    value: '41 inquiries',
    description: 'Demand remains strongest in Kilimani, Westlands, and Ruaka for move-in ready units with secure access.',
  },
  {
    title: 'Family Villas',
    type: 'Luxury',
    value: '29 inquiries',
    description: 'High-end residential buyers are prioritizing gated compounds, quality finishes, and outdoor living spaces.',
  },
  {
    title: 'Commercial Suites',
    type: 'Investors',
    value: '17 inquiries',
    description: 'Investors are seeking yields from mixed-use office and retail spaces in central business districts.',
  },
];

export { featuredProperties } from './data';


































































































































































































































































































































































































few
