import Link from "next/link";
import { Play, Users, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BASE_PATH } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background — локальный SVG для надёжной работы на GitHub Pages */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BASE_PATH}/hero-bg.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 md:px-12 py-20">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 max-w-[800px] text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-light animate-pulse" />
              Вся Россия
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[72px] font-medium text-white leading-[1.1] mb-6">
              Профессиональный персонал для вашего события
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-[560px] mb-10">
              Соединяем рестораны, кейтеринги и event-агентства с официантами,
              барменами и хостес. Находите команду или работу за один клик.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/candidates">
                <Button
                  variant="primary"
                  size="lg"
                  className="gap-2 bg-emerald hover:bg-emerald-light text-white"
                >
                  <Users className="h-5 w-5" />
                  Найти персонал
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button
                  variant="secondary"
                  size="lg"
                  className="gap-2 border-white text-white hover:bg-white/10"
                >
                  <UserCircle className="h-5 w-5" />
                  Разместить анкету
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 w-full max-w-md">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-ink/60 border border-white/10 group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
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
