import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nairobi Heights | Real Estate Management',
  description: 'Modern real estate platform for property sales, rentals, and property management in Kenya.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
