'use client';

import { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Heart,
  MessageSquare,
  Search,
  Bell,
  ImagePlus,
  Banknote,
  Briefcase,
  Send,
} from 'lucide-react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardTopBar } from '@/components/layout/DashboardTopBar';
import { useChatInboxStore } from '@/stores/chatInboxStore';
import { RestrictionBanner } from '@/components/layout/RestrictionBanner';

export function EmployerDashboardShell({ children }: { children: React.ReactNode }) {
  const chatUnread = useChatInboxStore((s) => s.unreadTotal);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarItems = useMemo(
    () => [
      { href: '/employer/dashboard', label: 'Дашборд', icon: LayoutDashboard },
      { href: '/employer/profile', label: 'Профиль компании', icon: Building2 },
      { href: '/employer/vacancies', label: 'Мои вакансии', icon: FileText },
      { href: '/employer/shifts', label: 'Смены', icon: Briefcase },
      { href: '/employer/invitations', label: 'Приглашения', icon: Send },
      { href: '/employer/workers', label: 'Найти персонал', icon: Search },
      { href: '/employer/favorites', label: 'Избранное', icon: Heart },
      { href: '/employer/messages', label: 'Сообщения', icon: MessageSquare, badge: chatUnread },
      { href: '/employer/applications', label: 'Все отклики', icon: Users },
      { href: '/employer/payments', label: 'Оплата', icon: Banknote },
      { href: '/employer/settings/notifications', label: 'Уведомления', icon: Bell },
      { href: '/employer/profile/media', label: 'Медиа', icon: ImagePlus },
    ],
    [chatUnread],
  );
  return (
    <div className="flex min-h-screen bg-[linear-gradient(160deg,#0d1f17_0%,#122a1e_40%,#0a1810_100%)] text-gray-100">
      <DashboardSidebar
        items={sidebarItems}
        logoHref="/employer/dashboard"
        dark
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <DashboardTopBar variant="cabinet" onMenuToggle={() => setMobileMenuOpen((v) => !v)} />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <RestrictionBanner />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
