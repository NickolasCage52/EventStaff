import Link from "next/link";
import { JobCard } from "@/components/ui/JobCard";
import { jobs } from "@/data/jobs";

export function JobsPreviewSection() {
  const latestJobs = jobs.slice(0, 4);

  return (
    <section className="px-6 md:px-12 py-20 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-display text-3xl font-medium text-ink">
            Актуальные вакансии
          </h2>
          <Link
            href="/jobs"
            className="text-emerald hover:text-emerald-light font-medium transition-colors flex items-center gap-1"
          >
            Смотреть все
            <span className="text-lg">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
