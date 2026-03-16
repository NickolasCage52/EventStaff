import Link from "next/link";
import { JobCard } from "@/components/ui/JobCard";
import { jobs } from "@/data/jobs";
import { Container } from "@/components/layout/Container";

export function JobsPreviewSection() {
  const latestJobs = jobs.slice(0, 4);

  return (
    <section className="py-12 md:py-16 xl:py-20 bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
          <h2 className="font-display text-2xl md:text-3xl xl:text-4xl font-medium text-ink">
            Актуальные вакансии
          </h2>
          <Link
            href="/jobs"
            className="text-emerald hover:text-emerald-light font-medium transition-colors flex items-center gap-1 min-h-[44px] items-center"
          >
            Смотреть все
            <span className="text-lg">→</span>
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 xl:grid-cols-4 md:overflow-visible md:gap-6">
          {latestJobs.map((job) => (
            <div
              key={job.id}
              className="min-w-[280px] md:min-w-0 snap-start flex-shrink-0 md:flex-shrink"
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
