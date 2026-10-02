import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { fetchPropertyById, getFallbackProperties } from '@/lib/api';

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = (await fetchPropertyById(params.id)) ?? getFallbackProperties()[0];

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-slate-800">
      <Navigation />

      <section className="bg-[#effaf6] py-12">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-700">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-brand-700">Properties</Link>
            <span>/</span>
            <span className="text-slate-800">{property.name}</span>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <img
                src={property.image}
                alt={property.name}
                className="h-[500px] w-full rounded-[2rem] object-cover shadow-soft"
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[property.location, `${property.bedrooms} bedrooms`, property.type].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
                  {property.status}
                </span>
                <span className="text-sm font-semibold text-slate-500">{property.location}</span>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-slate-900">KES {property.price.toLocaleString()}</h1>

              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <span>Bedrooms</span>
                  <strong className="text-slate-900">{property.bedrooms}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <span>Bathrooms</span>
                  <strong className="text-slate-900">{property.bathrooms}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <span>Area</span>
                  <strong className="text-slate-900">{property.area} sq ft</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Developer</span>
                  <strong className="text-slate-900">Nairobi Heights</strong>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                  Book a viewing
                </button>
                <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300">
                  Request more information
                </button>
              </div>
            </aside>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black tracking-[-0.03em] text-slate-900">Property overview</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {property.description}
              </p>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-900">Amenities</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {property.amenities.map((amenity) => (
                    <span key={amenity} className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black tracking-[-0.03em] text-slate-900">Payment options</h2>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
                  <div className="font-bold text-brand-700">Cash Purchase</div>
                  <div className="mt-1">KES {property.price.toLocaleString()} total</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="font-bold text-slate-900">Mortgage / Installment</div>
                  <div className="mt-1">From KES 420,000 / month</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="font-bold text-slate-900">Developer Payment Plan</div>
                  <div className="mt-1">30% deposit + flexible balance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
