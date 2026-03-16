"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CheckCircle } from "lucide-react";

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
      <div className="px-6 md:px-12 py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald/10 text-emerald mb-8 animate-scale-in">
            <CheckCircle className="h-12 w-12" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-3xl font-medium text-ink mb-4">
            Спасибо!
          </h1>
          <p className="text-ink/70 text-lg">
            Мы свяжемся с вами в ближайшее время.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-20">
      <div className="mx-auto max-w-[560px]">
        <h1 className="font-display text-3xl font-medium text-ink mb-4">
          Обратная связь
        </h1>
        <p className="text-ink/70 mb-12">
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
              className={errors.name ? "border-red-500 focus:ring-red-500/30" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Роль
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  checked={form.role === "employer"}
                  onChange={() => setForm((f) => ({ ...f, role: "employer" }))}
                  className="w-4 h-4 text-emerald focus:ring-emerald/30"
                />
                <span className="text-ink">Работодатель</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
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
                <span className="text-ink">Соискатель</span>
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
              className={errors.email ? "border-red-500 focus:ring-red-500/30" : ""}
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
              className={`min-h-[120px] ${
                errors.message ? "border-red-500 focus:ring-red-500/30" : ""
              }`}
            />
            {errors.message && (
              <p className="text-sm text-red-500 mt-1">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
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
