import Link from "next/link";
import { Container } from "./Container";

const columns = [
  {
    title: "О платформе",
    links: [
      { href: "/", label: "Главная" },
      { href: "/#how-it-works", label: "Как это работает" },
      { href: "/feedback", label: "Обратная связь" },
    ],
  },
  {
    title: "Для работодателей",
    links: [
      { href: "/jobs", label: "Вакансии" },
      { href: "/candidates", label: "Найти персонал" },
      { href: "/onboarding", label: "Регистрация" },
    ],
  },
  {
    title: "Для соискателей",
    links: [
      { href: "/candidates", label: "Кандидаты" },
      { href: "/jobs", label: "Вакансии" },
      { href: "/onboarding", label: "Разместить анкету" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white/60 mt-12 md:mt-20">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-medium text-white mb-4">{col.title}</h4>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition-colors duration-200 block min-h-[44px] leading-[44px] sm:leading-normal sm:min-h-0"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm">
            © {new Date().getFullYear()} EventStaff. Россия.
          </div>
        </div>
      </Container>
    </footer>
  );
}
