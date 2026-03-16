import { JobsCatalog } from "@/components/catalog/JobsCatalog";
import { Suspense } from "react";

export const metadata = {
  title: "Вакансии — EventStaff",
  description: "Каталог вакансий для event-персонала по всей России",
};

export default function JobsPage() {
  return (
    <div className="px-6 md:px-12 py-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-12 text-ink/70 max-w-2xl">
          Найдите персонал для мероприятий, банкетов и ресторанов
        </p>
        <Suspense fallback={<div className="animate-pulse h-64 bg-mist rounded-2xl" />}>
          <JobsCatalog />
        </Suspense>
      </div>
    </div>
  );
}
