import Link from "next/link";
import {
  FileText,
  Search,
  CheckCircle,
  UserPlus,
  ClipboardList,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const employerSteps = [
  {
    num: 1,
    icon: FileText,
    title: "Опишите потребность",
    desc: "Создайте вакансию с датой, ролью и условиями",
  },
  {
    num: 2,
    icon: Search,
    title: "Выберите из каталога",
    desc: "Поиск по ролям, опыту и рейтингу кандидатов",
  },
  {
    num: 3,
    icon: CheckCircle,
    title: "Забронируйте персонал",
    desc: "Пригласите на вакансию и согласуйте детали",
  },
];

const candidateSteps = [
  {
    num: 1,
    icon: UserPlus,
    title: "Создайте анкету",
    desc: "Фото, опыт, уровень заведений, портфолио",
  },
  {
    num: 2,
    icon: ClipboardList,
    title: "Откликайтесь на вакансии",
    desc: "Или дождитесь приглашения от работодателя",
  },
  {
    num: 3,
    icon: Send,
    title: "Получайте приглашения",
    desc: "Связь с работодателем и подтверждение брони",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-t border-mist bg-white px-6 md:px-12 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-medium text-ink mb-16">
          Как это работает
        </h2>
        <div className="grid grid-cols-2 gap-16">
          <div className="pr-8 border-r border-mist">
            <h3 className="font-display text-xl font-medium text-emerald mb-8">
              Для работодателей
            </h3>
            <div className="space-y-8">
              {employerSteps.map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-ink mb-1">{step.title}</h4>
                    <p className="text-sm text-ink/70">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/candidates" className="mt-8 inline-block">
              <Button variant="primary">Найти персонал</Button>
            </Link>
          </div>
          <div className="pl-8">
            <h3 className="font-display text-xl font-medium text-mocha mb-8">
              Для соискателей
            </h3>
            <div className="space-y-8">
              {candidateSteps.map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mocha/10 text-mocha">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-ink mb-1">{step.title}</h4>
                    <p className="text-sm text-ink/70">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/onboarding" className="mt-8 inline-block">
              <Button variant="mocha">Разместить анкету</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
