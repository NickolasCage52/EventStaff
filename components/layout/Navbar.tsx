"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/jobs", label: "Вакансии" },
  { href: "/candidates", label: "Кандидаты" },
  { href: "/#how-it-works", label: "Как это работает" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/#how-it-works") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 h-[72px] flex items-center bg-fog/95 backdrop-blur-md border-b border-mist transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl w-full items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-2xl font-medium text-emerald"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          EventStaff
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-emerald border-b-2 border-emerald pb-0.5"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard/employer">
            <Button variant="ghost" size="sm">
              Войти
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button variant="primary" size="sm">
              Разместить анкету
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
