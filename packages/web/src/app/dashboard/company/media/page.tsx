'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function LegacyCompanyMediaRedirect() {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;
    if (user?.activeRole === 'worker') {
      router.replace('/worker/profile/media');
    } else {
      router.replace('/employer/profile/media');
    }
  }, [user, isInitialized, router]);

  return null;
}
