import Link from "next/link";
import { Briefcase, UserCheck, Check, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Выбор роли — EventStaff",
  description: "Выберите как вы хотите использовать платформу: работодатель или соискатель",
};

const employerBullets = [
  "Поиск по ролям и опыту в каталоге",
  "Быстрое бронирование под дату",
  "Проверенные профили с отзывами",
];

const candidateBullets = [
  "Заполните анкету за 5 минут",
  "Откликайтесь или ждите приглашений",
  "Гибкий график и разовые смены",
];

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-mist bg-fog/95">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-medium text-emerald"
        >
          EventStaff
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm">
            Вернуться на главную
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 grid grid-cols-2 min-h-[calc(100vh-72px)]">
          <Link
            href="/dashboard/employer"
            className="group flex flex-col items-center justify-center px-16 py-20 bg-emerald-dark text-white hover:bg-emerald-dark/95 transition-colors"
          >
            <div className="flex h-[48px] w-[48px] items-center justify-center text-white mb-8">
              <Briefcase className="h-12 w-12" />
            </div>
            <h2 className="font-display text-3xl font-medium mb-4">
              Я ищу персонал
            </h2>
            <p className="text-white/80 text-center max-w-md mb-8">
              Размещайте вакансии, выбирайте из каталога проверенных кандидатов
              и бронируйте персонал под конкретные даты мероприятий.
            </p>
            <ul className="space-y-3 mb-10">
              {employerBullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="secondary"
              className="bg-white text-emerald border-0 hover:bg-white/90"
            >
              Начать поиск
            </Button>
          </Link>

          <Link
            href="/dashboard/candidate"
            className="group flex flex-col items-center justify-center px-16 py-20 bg-mocha-dark text-white hover:bg-mocha-dark/95 transition-colors"
          >
            <div className="flex h-[48px] w-[48px] items-center justify-center text-white mb-8">
              <UserCheck className="h-12 w-12" />
            </div>
            <h2 className="font-display text-3xl font-medium mb-4">
              Я ищу работу
            </h2>
            <p className="text-white/80 text-center max-w-md mb-8">
              Создайте анкету, откликайтесь на вакансии и получайте приглашения
              от работодателей. Работайте на мероприятиях в удобном для вас
              формате.
            </p>
            <ul className="space-y-3 mb-10">
              {candidateBullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="secondary"
              className="bg-white text-mocha border-0 hover:bg-white/90"
            >
              Создать анкету
            </Button>
          </Link>
        </div>

        <div className="relative w-full aspect-video bg-ink/90 border-t border-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30 transition-colors cursor-pointer">
              <Play className="h-8 w-8 ml-1" fill="currentColor" />
            </button>
          </div>
          <p className="absolute bottom-4 left-4 right-4 text-center text-sm text-white/70">
            Как работает платформа
          </p>
        </div>
      </main>
    </div>
  );
}
