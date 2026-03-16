"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  FileCheck,
  Eye,
  Settings,
  LogOut,
  X,
  Plus,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Card, CardContent } from "@/components/ui/Card";
import { ToastProvider, useToast } from "@/components/providers/ToastProvider";

type Tab = "profile" | "responses" | "views" | "settings";

const navItems = [
  { id: "profile" as Tab, label: "Профиль", icon: User },
  { id: "responses" as Tab, label: "Мои отклики", icon: FileCheck },
  { id: "views" as Tab, label: "Просмотры", icon: Eye },
  { id: "settings" as Tab, label: "Настройки", icon: Settings },
];

const responseStatuses: Record<
  string,
  { label: string; variant: "pending" | "available" | "default" }
> = {
  "На рассмотрении": { label: "На рассмотрении", variant: "pending" },
  Приглашён: { label: "Приглашён", variant: "available" },
  Отклонён: { label: "Отклонён", variant: "default" },
};

const responses = [
  {
    vacancy: "Официант — Ресторан «Панорама»",
    employer: "Ресторан «Панорама»",
    date: "15.03.2025",
    status: "На рассмотрении",
  },
  {
    vacancy: "Бармен — Кейтеринг «Праздник»",
    employer: "Кейтеринг «Праздник»",
    date: "14.03.2025",
    status: "Приглашён",
  },
  {
    vacancy: "Хостес — Банкетный зал «Морской»",
    employer: "Банкетный зал «Морской»",
    date: "12.03.2025",
    status: "Отклонён",
  },
  {
    vacancy: "Официант — Wedding Hall",
    employer: "Wedding Hall",
    date: "10.03.2025",
    status: "На рассмотрении",
  },
];

const viewData = [
  { company: "Ресторан «Панорама»", date: "2 часа назад" },
  { company: "Кейтеринг «Праздник»", date: "вчера" },
  { company: "Банкетный зал «Морской»", date: "3 дня назад" },
];

const chartData = [12, 18, 15, 22, 19, 25, 47];

function CandidateDashboardContent() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);
  const toast = useToast();

  const handleSave = () => {
    setSaved(true);
    toast.showToast("Профиль обновлён", "success");
  };

  return (
    <div className="flex gap-8">
      <aside className="w-60 shrink-0 sticky top-24 self-start">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Avatar name="Анна К." size="xl" />
          <div className="text-center">
            <p className="font-medium text-ink">Анна К.</p>
            <p className="text-sm text-ink/60">Официант</p>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-emerald text-white"
                  : "text-ink/70 hover:bg-mist hover:text-ink"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-8 gap-2 text-red-600 hover:bg-red-500/10 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Выйти
        </Button>
      </aside>

      <div className="flex-1 min-w-0">
        {activeTab === "profile" && (
          <div className="space-y-8">
            <Card className="p-8">
              <CardContent className="p-0 space-y-8">
                <div>
                  <h3 className="font-medium text-ink mb-4">Основное</h3>
                  <div className="flex items-center gap-6 mb-6">
                    <Avatar name="Анна К." size="xl" />
                    <Button variant="secondary" size="sm">
                      Изменить фото
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        Имя
                      </label>
                      <Input defaultValue="Анна К." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        Роль / специализация
                      </label>
                      <Select>
                        <option>Официант</option>
                        <option>Бармен</option>
                        <option>Хостес</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        Возраст
                      </label>
                      <Input type="number" defaultValue="26" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        О себе
                      </label>
                      <Textarea
                        rows={4}
                        defaultValue="Работаю официантом более 2 лет..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-ink mb-4">Опыт и уровень</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        Опыт работы (лет)
                      </label>
                      <Input type="number" defaultValue="2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        Уровень заведений
                      </label>
                      <Select>
                        <option value="">Выберите</option>
                        <option>Эконом</option>
                        <option>Средний</option>
                        <option>Премиум</option>
                        <option>Люкс</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        Ключевые навыки
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Банкеты", "Ресторан", "Кейтеринг"].map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-mist text-sm"
                          >
                            {s}
                            <X className="h-3 w-3 cursor-pointer" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-ink mb-4">Доступность</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-ink">
                        Готовность работать вне города
                      </span>
                      <Switch checked onCheckedChange={() => {}} />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-ink">
                        Готовность к овертайму
                      </span>
                      <Switch checked onCheckedChange={() => {}} />
                    </label>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        Временные ограничения
                      </label>
                      <Textarea placeholder="Напр.: только выходные" rows={2} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-ink mb-4">Портфолио</h3>
                  <div className="flex flex-wrap gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-24 w-32 rounded-lg border-2 border-dashed border-mist flex items-center justify-center text-ink/40 text-sm"
                      >
                        Drag & drop
                      </div>
                    ))}
                    <button className="h-24 w-32 rounded-lg border-2 border-dashed border-mist flex items-center justify-center text-ink/60 hover:border-emerald hover:text-emerald transition-colors">
                      <Plus className="h-6 w-6" />
                    </button>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2">
                    + Добавить работу
                  </Button>
                </div>

                <Button variant="primary" size="lg" onClick={handleSave}>
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "responses" && (
          <Card className="p-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-mist">
                      <th className="text-left py-4 px-6 font-medium text-ink">
                        Вакансия
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-ink">
                        Работодатель
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-ink">
                        Дата
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-ink">
                        Статус
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-ink">
                        Действие
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((r, i) => (
                      <tr key={i} className="border-b border-mist last:border-0">
                        <td className="py-4 px-6 text-ink">{r.vacancy}</td>
                        <td className="py-4 px-6 text-ink/70">{r.employer}</td>
                        <td className="py-4 px-6 text-ink/70">{r.date}</td>
                        <td className="py-4 px-6">
                          <Badge
                            variant={
                              responseStatuses[r.status]?.variant || "default"
                            }
                          >
                            {r.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <Button variant="ghost" size="sm">
                            Смотреть
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "views" && (
          <div className="space-y-8">
            <Card className="p-8">
              <CardContent className="p-0">
                <p className="text-4xl font-light text-emerald mb-1">47</p>
                <p className="text-ink/70 mb-8">
                  Ваш профиль просмотрели за последние 30 дней
                </p>
                <div className="space-y-4">
                  <p className="font-medium text-ink">Кто смотрел</p>
                  {viewData.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 border-b border-mist last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar name={v.company} size="sm" />
                        <span className="text-ink">{v.company}</span>
                      </div>
                      <span className="text-sm text-ink/60">{v.date}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <p className="font-medium text-ink mb-4">Просмотры за 7 дней</p>
                  <div className="flex items-end gap-1 h-24">
                    {chartData.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-emerald/30 rounded-t min-w-[20px]"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-ink/50 mt-2">
                    <span>Пн</span>
                    <span>Вс</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <Card className="p-8">
            <CardContent className="p-0">
              <h3 className="font-medium text-ink mb-4">Настройки</h3>
              <p className="text-ink/70">Раздел в разработке.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function CandidateDashboardPage() {
  return (
    <ToastProvider>
      <div className="px-6 md:px-12 py-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-3xl font-medium text-ink mb-8">
            Личный кабинет соискателя
          </h1>
          <CandidateDashboardContent />
        </div>
      </div>
    </ToastProvider>
  );
}
