import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'XP Productivity Hub',
  description: 'Audit + CPA Daily Command Centre',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}