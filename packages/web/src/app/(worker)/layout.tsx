'use client';

import type { ReactNode } from 'react';
import { ChatInboxProvider } from '@/components/chat/ChatInboxProvider';
import { WorkerDashboardShell } from '@/components/layout/WorkerDashboardShell';

export default function WorkerLayout({ children }: { children: ReactNode }) {
  return (
    <ChatInboxProvider>
      <WorkerDashboardShell>{children}</WorkerDashboardShell>
    </ChatInboxProvider>
  );
}
