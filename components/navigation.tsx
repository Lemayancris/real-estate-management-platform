import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { adminMetrics, monthlyRevenue, occupancyData, maintenanceTrend, topPerformance } from '@/lib/data';

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-slate-800">
      <Navigation />

      <section className="bg-[#effaf6] py-16">
        <div className="container">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Operations dashboard</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl">Executive overview</h1>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-soft">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Reporting period</div>
              <div className="mt-2 text-sm font-semibold text-slate-900">July 2026</div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {adminMetrics.map((metric) => (
              <div key={metric.label} className="card-strong rounded-3xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-slate-500">{metric.label}</div>
                    <div className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-900">{metric.value}</div>
                  </div>
                  <div className={`rounded-full px-2.5 py-1 text-xs font-semibold ${metric.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {metric.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="card-strong rounded-[2rem] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.16em] text-slate-500">Monthly revenue</div>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-900">KES 18.4M</h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">+12.4%</span>
              </div>

              <div className="chart-bar gap-3">
                {monthlyRevenue.map((item) => (
                  <div key={item.month} className="flex h-full w-full flex-col items-center justify-end gap-2">
                    <span style={{ height: `${item.value}%` }} className="w-full" />
                    <div className="text-[11px] font-medium text-slate-500">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-strong rounded-[2rem] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.16em] text-slate-500">Occupancy</div>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-900">81.4%</h2>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">Stable</span>
              </div>

              <div className="space-y-4">
                {occupancyData.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between text-sm text-slate-600">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-brand-600" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="card-strong rounded-[2rem] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.16em] text-slate-500">Maintenance requests</div>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-900">Active issues</h2>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">17 open</span>
              </div>

              <div className="space-y-4">
                {maintenanceTrend.map((issue) => (
                  <div key={issue.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900">{issue.label}</div>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{issue.priority}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                      <span>{issue.count} tickets</span>
                      <span>{issue.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-strong rounded-[2rem] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.16em] text-slate-500">Top performers</div>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-900">Sales teams</h2>
                </div>
              </div>

              <div className="space-y-4">
                {topPerformance.map((item) => (
                  <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-sm text-slate-500">{item.role}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-brand-700">{item.sales}</div>
                        <div className="text-xs uppercase tracking-[0.12em] text-slate-500">sales</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
