// app/auth/error/page.tsx
'use client';

import dynamic from 'next/dynamic';

const AuthErrorPage = dynamic(() => import('@/components/ui/AuthErrorPage'), { ssr: false });

export default function Page() {
  return <AuthErrorPage />;
}
