'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function LegacyNotificationsRedirect() {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;
    if (user?.activeRole === 'employer') {
      router.replace('/employer/settings/notifications');
    } else {
      router.replace('/worker/settings/notifications');
    }
  }, [user, isInitialized, router]);

  return null;
}
