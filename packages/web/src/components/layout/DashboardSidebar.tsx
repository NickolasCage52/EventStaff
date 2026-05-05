'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { X } from 'lucide-react';

interface SidebarItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  logoHref: string;
  dark?: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

function NavLinks({
  items,
  dark,
  onLinkClick,
}: {
  items: SidebarItem[];
  dark: boolean;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1 p-4">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={`flex items-center gap-3 rounded-input px-3 py-2 text-sm font-medium transition ${
              isActive
                ? dark
                  ? 'border-l-[3px] border-primary-500 bg-white/[0.08] pl-[9px] text-white'
                  : 'bg-primary-50 text-primary-700'
                : dark
                ? 'border-l-[3px] border-transparent pl-[9px] text-white/60 hover:bg-white/[0.05] hover:text-white/90'
                : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.badge != null && item.badge > 0 && (
              <span className="shrink-0 rounded-full bg-primary-500 px-1.5 py-0.5 text-xs font-bold leading-none text-white">
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSidebar({
  items,
  logoHref,
  dark = false,
  mobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMobileClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mobileOpen, onMobileClose]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const logoSection = (
    <div
      className={`flex h-16 items-center gap-2 border-b px-6 ${
        dark ? 'border-white/[0.08]' : 'border-gray-200'
      }`}
    >
      <Link href={logoHref} className="flex items-center gap-2" onClick={onMobileClose}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
          <span className="text-sm font-bold text-white">U</span>
        </div>
        <span className={`font-heading text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
          Юнити
        </span>
      </Link>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden w-64 shrink-0 border-r lg:block ${
          dark ? 'border-white/[0.08] bg-white/[0.04]' : 'border-gray-200 bg-white'
        }`}
      >
        {logoSection}
        <NavLinks items={items} dark={dark} />
      </aside>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-hidden="true"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${dark ? 'border-r border-white/[0.08] bg-[#0d1f17]' : 'border-r border-gray-200 bg-white'}`}
        aria-label="Мобильная навигация"
      >
        <div className="flex items-center justify-between pr-4">
          {logoSection}
          <button
            onClick={onMobileClose}
            aria-label="Закрыть меню"
            className={`rounded-full p-1.5 ${dark ? 'text-white/60 hover:bg-white/10 hover:text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <NavLinks items={items} dark={dark} onLinkClick={onMobileClose} />
      </aside>
    </>
  );
}
