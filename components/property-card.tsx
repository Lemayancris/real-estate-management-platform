import Link from 'next/link';

export function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white py-10">
      <div className="container grid gap-8 md:grid-cols-3">
        <div>
          <div className="text-2xl font-black tracking-[-0.04em] text-slate-900">Nairobi Heights</div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            Real estate investments, premium property sales, and rental management services for the Kenyan market.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Company</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li><Link href="/properties">Properties</Link></li>
            <li><Link href="/admin">Admin dashboard</Link></li>
            <li><Link href="/">Investors</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>+254 700 000 000</li>
            <li>sales@nairobiheights.co.ke</li>
            <li>Westlands, Nairobi</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
