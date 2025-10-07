'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/useAuthStore';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const pathname = usePathname();
  const router = useRouter();
  const [rehydratedCheckDone, setRehydratedCheckDone] = useState(false);

  useEffect(() => {
    // Allow access to login page
    if (!pathname || pathname.startsWith('/login')) {
      setRehydratedCheckDone(true);
      return;
    }

    // Small timeout to allow zustand persist to rehydrate from localStorage
    const t = setTimeout(() => {
      setRehydratedCheckDone(true);
    }, 150);

    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!rehydratedCheckDone) return;

    if (pathname?.startsWith('/login')) return;

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.replace('/login');
    }
  }, [isAuthenticated, rehydratedCheckDone, pathname, router]);

  // While waiting for rehydration, render nothing (avoid flashing protected content)
  if (!rehydratedCheckDone) return null;

  // Always allow access to the login page
  if (pathname?.startsWith('/login')) return <>{children}</>;

  // If not authenticated, we early-return null while the effect will redirect to /login
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
