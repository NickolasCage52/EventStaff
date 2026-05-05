'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function LegacyChatRedirect() {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;
    if (user?.activeRole === 'employer') {
      router.replace('/employer/messages');
    } else {
      router.replace('/worker/messages');
    }
  }, [user, isInitialized, router]);

  return null;
}
