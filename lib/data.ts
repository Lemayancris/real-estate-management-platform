import Link from 'next/link';
import { Property } from '@/lib/data';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="card-strong overflow-hidden rounded-[2rem]">
      <div className="relative">
        <img src={property.image} alt={property.name} className="h-64 w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
          {property.status}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-slate-500">{property.location}</div>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-900">{property.name}</h3>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-brand-700">KES {property.price.toLocaleString()}</div>
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{property.type}</div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-5 text-sm text-slate-600">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
          <span>{property.area} sq ft</span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">{property.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
              {amenity}
            </span>
          ))}
        </div>

        <Link
          href={`/properties/${property.id}`}
          className="mt-6 inline-flex rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
