import Link from "next/link";
import { Play, Users, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BASE_PATH } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-auto md:min-h-[70vh] xl:min-h-[90vh] flex items-center justify-center overflow-hidden py-16 md:py-20 xl:py-0">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BASE_PATH}/hero-bg.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 max-w-[800px] text-center md:text-left w-full">
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-light animate-pulse" />
              Вся Россия
            </div>
            <h1 className="font-display text-4xl md:text-5xl xl:text-7xl font-medium text-white leading-[1.1] mb-4 md:mb-6">
              Профессиональный персонал для вашего события
            </h1>
            <p className="text-sm md:text-base xl:text-xl text-white/70 max-w-[560px] mx-auto md:mx-0 mb-8 md:mb-10 text-left">
              Соединяем рестораны, кейтеринги и event-агентства с официантами,
              барменами и хостес. Находите команду или работу за один клик.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Link href="/candidates" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto gap-2 min-h-[44px] bg-emerald hover:bg-emerald-light text-white"
                >
                  <Users className="h-5 w-5" />
                  Найти персонал
                </Button>
              </Link>
              <Link href="/onboarding" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto gap-2 min-h-[44px] border-white text-white hover:bg-white/10"
                >
                  <UserCircle className="h-5 w-5" />
                  Разместить анкету
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 w-full max-w-md">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-ink/60 border border-white/10 group cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 min-w-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur group-hover:bg-white/30 transition-colors">
                  <Play className="h-8 w-8 ml-1" fill="currentColor" />
                </div>
              </div>
              <p className="absolute bottom-4 left-4 right-4 text-center text-sm text-white/70">
                Узнать о платформе за 2 минуты
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
