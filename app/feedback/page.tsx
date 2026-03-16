"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    role: "" as "" | "employer" | "candidate",
    email: "",
    message: "",
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Обязательное поле";
    if (!form.role) e.role = "Выберите роль";
    if (!form.email.trim()) e.email = "Обязательное поле";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Некорректный email";
    }
    if (!form.message.trim()) e.message = "Обязательное поле";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="px-4 sm:px-6 md:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald/10 text-emerald mb-6 md:mb-8 animate-scale-in">
            <CheckCircle className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-medium text-ink mb-4">
            Спасибо!
          </h1>
          <p className="text-base md:text-lg text-ink/70">
            Мы свяжемся с вами в ближайшее время.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 py-12 md:py-20">
      <div className="mx-auto max-w-full sm:max-w-[480px] xl:max-w-[560px]">
        <h1 className="font-display text-2xl md:text-3xl font-medium text-ink mb-4">
          Обратная связь
        </h1>
        <p className="text-sm md:text-base text-ink/70 mb-8 md:mb-12">
          Расскажите о своих вопросах или предложениях
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Имя
            </label>
            <Input
              placeholder="Как к вам обращаться?"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={cn("w-full min-h-[44px]", errors.name ? "border-red-500 focus:ring-red-500/30" : "")}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Роль
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all min-h-[44px]",
                  form.role === "employer"
                    ? "border-emerald bg-emerald/5"
                    : "border-mist hover:border-emerald/50"
                )}
              >
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  checked={form.role === "employer"}
                  onChange={() => setForm((f) => ({ ...f, role: "employer" }))}
                  className="w-4 h-4 text-emerald focus:ring-emerald/30"
                />
                <span className="text-ink font-medium">Работодатель</span>
              </label>
              <label
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all min-h-[44px]",
                  form.role === "candidate"
                    ? "border-emerald bg-emerald/5"
                    : "border-mist hover:border-emerald/50"
                )}
              >
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={form.role === "candidate"}
                  onChange={() =>
                    setForm((f) => ({ ...f, role: "candidate" }))
                  }
                  className="w-4 h-4 text-emerald focus:ring-emerald/30"
                />
                <span className="text-ink font-medium">Соискатель</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">{errors.role}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={cn("w-full min-h-[44px]", errors.email ? "border-red-500 focus:ring-red-500/30" : "")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Сообщение
            </label>
            <Textarea
              placeholder="Ваш вопрос или предложение..."
              rows={5}
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              className={cn(
                "w-full min-h-[120px]",
                errors.message ? "border-red-500 focus:ring-red-500/30" : ""
              )}
            />
            {errors.message && (
              <p className="text-sm text-red-500 mt-1">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full min-h-[44px]"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Отправка...
              </span>
            ) : (
              "Отправить"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
