'use client';

import type { ReactNode } from 'react';
import { ChatInboxProvider } from '@/components/chat/ChatInboxProvider';
import { EmployerDashboardShell } from '@/components/layout/EmployerDashboardShell';

export default function EmployerLayout({ children }: { children: ReactNode }) {
  return (
    <ChatInboxProvider>
      <EmployerDashboardShell>{children}</EmployerDashboardShell>
    </ChatInboxProvider>
  );
}
