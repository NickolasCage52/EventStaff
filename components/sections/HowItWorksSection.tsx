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
import { Container } from "@/components/layout/Container";

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
      className="border-t border-mist bg-white py-12 md:py-16 xl:py-20"
    >
      <Container>
        <h2 className="font-display text-2xl md:text-3xl xl:text-4xl font-medium text-ink mb-8 md:mb-16">
          Как это работает
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 md:divide-x divide-mist">
          <div className="md:pr-8">
            <h3 className="font-display text-lg md:text-xl font-medium text-emerald mb-6 md:mb-8">
              Для работодателей
            </h3>
            <div className="space-y-6 md:space-y-8">
              {employerSteps.map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                    <step.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-ink mb-1 text-base md:text-lg">
                      {step.title}
                    </h4>
                    <p className="text-sm text-ink/70">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/candidates" className="mt-6 md:mt-8 inline-block">
              <Button variant="primary" className="min-h-[44px] w-full md:w-auto">
                Найти персонал
              </Button>
            </Link>
          </div>
          <div className="md:pl-8 pt-8 md:pt-0 border-t md:border-t-0 border-mist">
            <h3 className="font-display text-lg md:text-xl font-medium text-mocha mb-6 md:mb-8">
              Для соискателей
            </h3>
            <div className="space-y-6 md:space-y-8">
              {candidateSteps.map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-mocha/10 text-mocha">
                    <step.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-ink mb-1 text-base md:text-lg">
                      {step.title}
                    </h4>
                    <p className="text-sm text-ink/70">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/onboarding" className="mt-6 md:mt-8 inline-block">
              <Button variant="mocha" className="min-h-[44px] w-full md:w-auto">
                Разместить анкету
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
