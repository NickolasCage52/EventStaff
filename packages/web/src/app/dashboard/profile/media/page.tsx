'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function LegacyProfileMediaRedirect() {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;
    if (user?.activeRole === 'employer') {
      router.replace('/employer/profile/media');
    } else {
      router.replace('/worker/profile/media');
    }
  }, [user, isInitialized, router]);

  return null;
}
