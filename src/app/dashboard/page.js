// app/dashboard/page.tsx
'use client';

import dynamic from 'next/dynamic';

const DashboardClient = dynamic(() => import('./DashboardClient'), { ssr: false });

export default function DashboardPage() {
  return <DashboardClient />;
}
