"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Briefcase, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/jobs", label: "Вакансии" },
  { href: "/candidates", label: "Кандидаты" },
  { href: "/#how-it-works", label: "Как это работает" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/#how-it-works") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 h-[72px] flex items-center bg-fog/95 backdrop-blur-md border-b border-mist transition-shadow duration-200",
          scrolled ? "shadow-sm" : ""
        )}
      >
        <nav className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl sm:text-2xl font-medium text-emerald"
          >
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-emerald">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            EventStaff
          </Link>

          {/* Desktop nav (xl+) */}
          <div className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isActive(link.href)
                    ? "text-emerald border-b-2 border-emerald pb-0.5"
                    : "text-ink/70 hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA (xl+) */}
          <div className="hidden xl:flex items-center gap-4">
            <Link href="/dashboard/employer">
              <Button variant="ghost" size="sm" className="min-h-[44px]">
                Войти
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="primary" size="sm" className="min-h-[44px]">
                Разместить анкету
              </Button>
            </Link>
          </div>

          {/* Mobile burger (base → lg) */}
          <div className="xl:hidden flex items-center gap-2">
            <Link href="/dashboard/employer">
              <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px] p-0 hidden sm:inline-flex">
                Войти
              </Button>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-mist transition-colors min-h-[44px] min-w-[44px]"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-ink" />
              ) : (
                <Menu className="h-6 w-6 text-ink" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile/Tablet menu (fullscreen drawer) */}
      <div
        className={cn(
          "xl:hidden fixed inset-0 top-[72px] z-40 bg-fog transition-transform duration-300 ease-out",
          menuOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
        )}
        style={{ height: "calc(100vh - 72px)" }}
      >
        <div className="flex flex-col h-full px-4 sm:px-6 py-8 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "py-4 font-display text-[28px] font-medium border-b border-mist",
                  isActive(link.href) ? "text-emerald" : "text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <Link href="/dashboard/employer" onClick={closeMenu}>
              <Button
                variant="ghost"
                size="lg"
                className="w-full min-h-[44px] justify-center sm:hidden"
              >
                Войти
              </Button>
            </Link>
            <Link href="/onboarding" onClick={closeMenu}>
              <Button
                variant="primary"
                size="lg"
                className="w-full min-h-[44px] justify-center"
              >
                Разместить анкету
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
