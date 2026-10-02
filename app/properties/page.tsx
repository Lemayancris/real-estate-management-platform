import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PropertyCard } from '@/components/property-card';
import { fetchProperties, getFallbackProperties, marketStats, activeLeads } from '@/lib/api';

export default async function HomePage() {
  const properties = await fetchProperties();

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-slate-800">
      <Navigation />

      <section className="relative overflow-hidden bg-[#effaf6]">
        <div className="container grid items-center gap-8 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Trusted property partner in Kenya
            </span>
            <h1 className="mt-6 max-w-xl text-5xl font-black leading-[1.02] tracking-[-0.06em] text-slate-900 md:text-6xl">
              Find your next address in Nairobi and beyond.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600">
              From premium apartments and luxury villas to commercial spaces and managed rental homes, our sales and property management platform helps clients move faster and smarter.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
              >
                Browse properties
              </Link>
              <Link
                href="/admin"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300"
              >
                View admin dashboard
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {marketStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-black text-brand-700">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-brand-100 bg-white p-4 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
                alt="Modern apartment exterior"
                className="h-[540px] w-full rounded-[1.5rem] object-cover"
              />
            </div>
            <div className="absolute -left-4 bottom-8 w-52 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="text-xs uppercase tracking-[0.12em] text-slate-500">New launch</div>
              <div className="mt-2 text-lg font-bold text-slate-900">Kilimani Heights</div>
              <div className="mt-1 text-sm text-brand-700">From KES 8.9M</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Featured homes</p>
              <h2 className="mt-3 section-title text-slate-900">Curated listings for buyers and investors</h2>
            </div>
            <Link href="/properties" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
              View all properties →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-100">Sales pipeline</p>
            <h3 className="mt-3 text-4xl font-black tracking-[-0.04em]">A complete sales funnel for the Kenyan property market</h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
            {['Website Visitor', 'Inquiry', 'Lead', 'Site Visit', 'Reservation', 'Deposit / Sale'].map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm font-medium text-slate-200">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Live demand</p>
            <h2 className="mt-3 section-title text-slate-900">What our buyers and tenants are asking for</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {activeLeads.map((lead) => (
              <div key={lead.title} className="card-strong rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
                    {lead.type}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">{lead.value}</span>
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">{lead.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{lead.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
