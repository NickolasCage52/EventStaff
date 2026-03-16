import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, ImageIcon, Check, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { Card } from "@/components/ui/Card";
import { candidates } from "@/data/candidates";
import { Container } from "@/components/layout/Container";
import { CandidatePageClient } from "./CandidatePageClient";

export async function generateStaticParams() {
  return candidates.map((c) => ({ id: c.id }));
}

const mockReviews = [
  {
    name: "Ресторан «Панорама»",
    date: "12.03.2025",
    text: "Отличная работа на банкете. Пунктуальная, внимательная к гостям.",
    rating: 5,
  },
  {
    name: "Кейтеринг «Праздник»",
    date: "08.03.2025",
    text: "Рекомендую. Профессиональный подход, быстрая обучаемость.",
    rating: 5,
  },
];

export default async function CandidatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = candidates.find((c) => c.id === id);
  if (!candidate) notFound();

  const paramsTable = [
    { label: "Возраст", value: `${candidate.age} лет` },
    { label: "Опыт", value: `${candidate.experience} года` },
    { label: "Уровень заведений", value: candidate.venueLevel },
    {
      label: "Готовность выезжать",
      value: candidate.canTravel ? "✅ Да" : "Нет",
    },
    {
      label: "Готовность к овертайму",
      value: candidate.overtime ? "✅ Да" : "Нет",
    },
    {
      label: "Временные ограничения",
      value: "Будни с 10:00",
    },
  ];

  return (
    <div className="pb-24 xl:pb-12">
      <Container className="py-6 md:py-12">
        {/* Mobile breadcrumb */}
        <Link
          href="/candidates"
          className="xl:hidden flex items-center gap-2 text-ink/60 text-sm mb-6 min-h-[44px] w-fit hover:text-ink"
        >
          <ChevronLeft size={16} />
          Кандидаты
        </Link>

        {/* Desktop breadcrumb */}
        <nav className="hidden xl:flex gap-2 text-sm text-ink/60 mb-8">
          <Link href="/" className="hover:text-ink transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/candidates" className="hover:text-ink transition-colors">
            Кандидаты
          </Link>
          <span>/</span>
          <span className="text-ink">{candidate.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {/* Mobile CTA card (top) */}
            <div className="xl:hidden mb-6">
              <div className="rounded-2xl border border-mist bg-white p-4 shadow-[var(--shadow-card)]">
                {candidate.available && (
                  <div className="flex items-center gap-2 mb-4 text-green-600">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium">Доступен для работы</span>
                  </div>
                )}
                <div className="flex gap-3">
                  <Button variant="primary" size="lg" className="flex-1 min-h-[44px]">
                    Пригласить
                  </Button>
                  <Button variant="secondary" size="lg" className="flex-1 min-h-[44px]">
                    Написать
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="min-h-[44px] min-w-[44px] p-0 shrink-0"
                    aria-label="В избранное"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile header - responsive */}
            <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-4 md:gap-6 mb-12">
              <Avatar
                name={candidate.name}
                size="2xl"
                verified={candidate.verified}
                className="w-24 h-24 md:w-32 md:h-32 shrink-0"
              />
              <div className="flex-1">
                <h1 className="font-display text-3xl md:text-4xl font-medium text-ink mb-2">
                  {candidate.name}
                </h1>
                <p className="text-lg md:text-xl text-ink/70 mb-3">{candidate.role}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                  {candidate.verified && (
                    <Badge variant="verified" className="gap-1">
                      <Check className="h-3.5 w-3.5" />
                      Verified
                    </Badge>
                  )}
                  {candidate.isTop && <Badge variant="top">Топ</Badge>}
                  {candidate.available && (
                    <Badge variant="available" className="gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Доступен
                    </Badge>
                  )}
                </div>
                <div className="flex justify-center md:justify-start">
                  <RatingStars
                    rating={candidate.rating}
                    count={candidate.reviewCount}
                    size="md"
                  />
                </div>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="font-display text-xl font-medium text-ink mb-4">
                О себе
              </h2>
              <p className="text-ink/80 leading-relaxed mb-6 text-sm md:text-base break-words">
                {candidate.about}
              </p>
              {/* Params table - grid on mobile */}
              <div className="rounded-xl border border-mist overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-mist">
                  {paramsTable.map((row, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-3 px-4 gap-4 sm:odd:bg-stone/50 sm:even:bg-white"
                    >
                      <span className="text-ink/60 text-sm">{row.label}</span>
                      <span className="font-medium text-sm text-right">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-display text-xl font-medium text-ink mb-4">
                Портфолио
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-xl bg-ink/10 flex items-center justify-center group cursor-pointer hover:bg-ink/20 active:scale-[0.98] transition-all relative overflow-hidden"
                  >
                    <ImageIcon className="h-10 w-10 text-ink/40 group-hover:text-ink/60" />
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ImageIcon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-ink mb-4">
                Отзывы
              </h2>
              <div className="space-y-4">
                {mockReviews.map((r, i) => (
                  <Card key={i} variant="flat" className="p-4 md:p-6">
                    <div className="flex gap-4 mb-3">
                      <Avatar name={r.name} size="sm" />
                      <div>
                        <p className="font-medium text-ink">{r.name}</p>
                        <p className="text-sm text-ink/60">{r.date}</p>
                      </div>
                    </div>
                    <RatingStars rating={r.rating} size="sm" className="mb-2" />
                    <p className="text-ink/80 text-sm md:text-base break-words">
                      {r.text}
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-mist bg-white p-6 shadow-[var(--shadow-card)]">
              {candidate.available && (
                <div className="flex items-center gap-2 mb-6 text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">
                    Доступен для работы
                  </span>
                </div>
              )}
              <Button variant="primary" size="lg" className="w-full mb-3 min-h-[44px]">
                Пригласить на работу
              </Button>
              <Button variant="secondary" size="lg" className="w-full mb-3 min-h-[44px]">
                Написать сообщение
              </Button>
              <Button variant="ghost" size="lg" className="w-full gap-2 mb-6 min-h-[44px]">
                <Heart className="h-5 w-5" />
                В избранное
              </Button>
              <div className="h-px bg-mist mb-6" />
              <div className="text-sm text-ink/60 space-y-2">
                <p>Просмотры профиля: 47 за 30 дней</p>
                <p>Откликов: 12</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <CandidatePageClient />
    </div>
  );
}
