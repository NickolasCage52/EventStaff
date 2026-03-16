import Link from "next/link";
import {
  UtensilsCrossed,
  Wine,
  User,
  Settings,
  ChefHat,
  CalendarDays,
  Receipt,
  Shirt,
} from "lucide-react";
import { Container } from "@/components/layout/Container";

const categories = [
  { icon: UtensilsCrossed, label: "Официанты", href: "/candidates?role=Официант", count: 32 },
  { icon: Wine, label: "Бармены", href: "/candidates?role=Бармен", count: 18 },
  { icon: User, label: "Хостес", href: "/candidates?role=Хостес", count: 12 },
  { icon: Settings, label: "Администраторы", href: "/candidates?role=Администратор", count: 8 },
  { icon: ChefHat, label: "Повара", href: "/candidates?role=Повар", count: 15 },
  { icon: CalendarDays, label: "Координаторы", href: "/candidates?role=Координатор", count: 9 },
  { icon: Receipt, label: "Кассиры", href: "/candidates?role=Кассир", count: 7 },
  { icon: Shirt, label: "Гардеробщики", href: "/candidates?role=Гардеробщик", count: 4 },
];

export function CategorySection() {
  return (
    <section className="py-12 md:py-16 xl:py-20 bg-stone">
      <Container>
        <h2 className="font-display text-2xl md:text-3xl xl:text-4xl font-medium text-ink mb-8 md:mb-16">
          Категории персонала
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-mist bg-white p-4 md:p-6 lg:p-8 transition-all duration-200 hover:bg-emerald hover:border-emerald hover:shadow-[var(--shadow-card-hover)] active:scale-[0.98]"
            >
              <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-mist text-ink/70 group-hover:bg-white/20 group-hover:text-white transition-colors">
                <cat.icon className="h-6 w-6 md:h-7 md:w-7" />
              </div>
              <span className="font-medium text-ink group-hover:text-white transition-colors text-sm md:text-base text-center break-words">
                {cat.label}
              </span>
              <span className="text-xs md:text-sm text-ink/60 group-hover:text-white/80">
                {cat.count} анкет
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
