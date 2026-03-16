import { Star, Shield, CheckCircle, Zap } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { Container } from "@/components/layout/Container";

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
    <section className="py-12 md:py-16 xl:py-20 bg-stone border-t border-mist">
      <Container>
        <h2 className="font-display text-2xl md:text-3xl xl:text-4xl font-medium text-ink mb-8 md:mb-16">
          Отзывы
        </h2>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 xl:grid-cols-3 md:overflow-visible md:gap-8 mb-8 md:mb-16">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="min-w-[280px] md:min-w-0 snap-start flex-shrink-0 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] active:scale-[0.98] transition-all duration-200"
            >
              <div className="flex gap-4 mb-4">
                <Avatar name={r.name} size="md" />
                <div>
                  <p className="font-medium text-ink">{r.name}</p>
                  <p className="text-sm text-ink/60">{r.role}</p>
                </div>
              </div>
              <RatingStars rating={r.rating} size="md" className="mb-4" />
              <p className="text-ink/80 leading-relaxed text-sm md:text-base break-words">
                &quot;{r.text}&quot;
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
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
      </Container>
    </section>
  );
}
