"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 124, label: "Активных исполнителей", suffix: "анкеты" },
  { value: 38, label: "Открытых позиций", suffix: "вакансий" },
  { value: 6, label: "Специализаций персонала", suffix: "категорий" },
];

function useCountUp(end: number, isVisible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, isVisible, duration]);

  return count;
}

function StatItem({
  value,
  label,
  isVisible,
}: {
  value: number;
  label: string;
  isVisible: boolean;
}) {
  const count = useCountUp(value, isVisible);
  return (
    <div>
      <p className="font-display text-4xl font-medium text-emerald mb-2">
        {count}
      </p>
      <p className="text-ink/70 text-sm">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-t border-mist bg-white px-6 md:px-12 py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3 gap-12 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={
                i < stats.length - 1
                  ? "border-r border-mist pr-12"
                  : ""
              }
            >
              <StatItem
                value={stat.value}
                label={stat.label}
                isVisible={isVisible}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
