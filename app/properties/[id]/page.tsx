import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PropertyCard } from '@/components/property-card';
import { fetchProperties } from '@/lib/api';

export default async function PropertiesPage() {
  const properties = await fetchProperties();

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-slate-800">
      <Navigation />

      <section className="bg-[#effaf6] py-16">
        <div className="container">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Property marketplace</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl">
                Explore available homes and investment opportunities
              </h1>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-soft">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Search overview</div>
              <div className="mt-2 text-sm font-semibold text-slate-900">Nairobi, Kiambu, Mombasa</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="grid gap-4 md:grid-cols-5">
              {['Location', 'Property Type', 'Budget', 'Bedrooms', 'Status'].map((field) => (
                <div key={field} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {field}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                Search properties
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300">
                Save search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Available listings</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-900">{properties.length} curated options</h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                {Math.max(1, properties.length)} available now
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
