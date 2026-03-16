import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Calendar, MapPin, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JobCard } from "@/components/ui/JobCard";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { jobs } from "@/data/jobs";
import { Container } from "@/components/layout/Container";
import { JobPageClient } from "./JobPageClient";

export async function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) notFound();

  const relatedJobs = jobs
    .filter((j) => j.id !== id && j.category === job.category)
    .slice(0, 3);

  return (
    <div className="pb-24 xl:pb-12">
      <Container className="py-6 md:py-12">
        {/* Mobile breadcrumb */}
        <Link
          href="/jobs"
          className="xl:hidden flex items-center gap-2 text-ink/60 text-sm mb-6 min-h-[44px] w-fit hover:text-ink"
        >
          <ChevronLeft size={16} />
          Вакансии
        </Link>

        {/* Desktop breadcrumb */}
        <nav className="hidden xl:flex gap-2 text-sm text-ink/60 mb-8">
          <Link href="/" className="hover:text-ink transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-ink transition-colors">
            Вакансии
          </Link>
          <span>/</span>
          <span className="text-ink">{job.role}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {/* Mobile CTA card (top) */}
            <div className="xl:hidden mb-6">
              <div className="rounded-2xl border border-mist bg-white p-4 shadow-[var(--shadow-card)]">
                <p className="text-xl font-medium text-ink mb-4">
                  По договорённости
                </p>
                <div className="flex gap-3">
                  <Button variant="primary" size="lg" className="flex-1 min-h-[44px]">
                    Откликнуться
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 min-h-[44px] min-w-[44px]"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="format">{job.format}</Badge>
              {job.urgent && <Badge variant="urgent">Срочно</Badge>}
            </div>
            <h1 className="font-display text-3xl md:text-4xl xl:text-5xl font-medium text-ink mb-2">
              {job.role}
            </h1>
            <p className="text-lg md:text-xl text-ink/70 mb-2">{job.company}</p>
            <div className="flex flex-wrap gap-4 text-ink/60 mb-8">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {job.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                Россия
              </span>
            </div>
            <div className="h-px bg-mist mb-8" />

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-xl font-medium text-ink mb-4">
                  Описание
                </h2>
                <p className="text-ink/80 leading-relaxed whitespace-pre-line text-sm md:text-base break-words">
                  {job.description}
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-ink mb-4">
                  Обязанности
                </h2>
                <ul className="space-y-2 text-ink/80 text-sm md:text-base">
                  {job.requirements.slice(0, 6).map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span>•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-ink mb-4">
                  Требования
                </h2>
                <ul className="space-y-2 text-ink/80 text-sm md:text-base">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span>•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-ink mb-4">
                  Условия работы
                </h2>
                <p className="text-ink/80 text-sm md:text-base break-words">
                  {job.conditions}
                </p>
              </section>
            </div>

            {relatedJobs.length > 0 && (
              <div className="mt-12 md:mt-16">
                <h2 className="font-display text-2xl font-medium text-ink mb-6">
                  Похожие вакансии
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {relatedJobs.map((j) => (
                    <JobCard key={j.id} job={j} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-mist bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="text-2xl font-medium text-ink mb-6">
                По договорённости
              </p>
              <Button variant="primary" size="lg" className="w-full mb-3 min-h-[44px]">
                Откликнуться
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full gap-2 mb-6 min-h-[44px]"
              >
                <Heart className="h-5 w-5" />
                В избранное
              </Button>
              <div className="h-px bg-mist mb-6" />
              <div className="flex gap-3 mb-4">
                <Avatar name={job.company} size="md" />
                <div>
                  <p className="font-medium text-ink">{job.company}</p>
                  <RatingStars rating={4.8} count={12} size="sm" />
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full min-h-[44px]">
                Написать работодателю
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile fixed bottom bar */}
      <JobPageClient job={job} />
    </div>
  );
}
