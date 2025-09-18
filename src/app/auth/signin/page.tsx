'use client';

import dynamic from 'next/dynamic';

const SignInPage = dynamic(() => import('@/components/ui/SignInPage'), { ssr: false });

export default function Page() {
  return <SignInPage />;
}
