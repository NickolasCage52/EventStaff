import { Star, Shield, CheckCircle, Zap } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";

const reviews = [
  {
    name: "Анна К.",
    role: "Соискатель",
    text: "Удобно находить смены под свой график. Уже работала на трёх мероприятиях через платформу. Рекомендую!",
    rating: 5,
    reviewCount: 3,
  },
  {
    name: "Дмитрий М.",
    role: "Работодатель",
    text: "Быстро закрыли банкет на 80 человек. Кандидаты с опытом, всё чётко. Планируем сотрудничать дальше.",
    rating: 5,
    reviewCount: 1,
  },
  {
    name: "Елена С.",
    role: "Соискатель",
    text: "Регулярно получаю приглашения. Рейтинг помогает выделиться среди других. Очень довольна сервисом.",
    rating: 4.5,
    reviewCount: 2,
  },
];

const trustItems = [
  { icon: Shield, label: "Проверенные профили" },
  { icon: CheckCircle, label: "Гарантия качества" },
  { icon: Zap, label: "Быстрый отклик" },
];

export function TrustSection() {
  return (
    <section className="px-6 md:px-12 py-20 bg-stone border-t border-mist">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-medium text-ink mb-16">
          Отзывы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-200"
            >
              <div className="flex gap-4 mb-4">
                <Avatar name={r.name} size="md" />
                <div>
                  <p className="font-medium text-ink">{r.name}</p>
                  <p className="text-sm text-ink/60">{r.role}</p>
                </div>
              </div>
              <RatingStars rating={r.rating} size="md" className="mb-4" />
              <p className="text-ink/80 leading-relaxed">&quot;{r.text}&quot;</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-12">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 text-ink/70"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                <item.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
