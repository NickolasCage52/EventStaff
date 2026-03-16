"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Search,
  Settings,
  LogOut,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { JobCard } from "@/components/ui/JobCard";
import { jobs } from "@/data/jobs";

type Tab = "dashboard" | "jobs" | "responses" | "search" | "settings";

const navItems = [
  { id: "dashboard" as Tab, label: "Дашборд", icon: LayoutDashboard },
  { id: "jobs" as Tab, label: "Мои вакансии", icon: Briefcase },
  { id: "responses" as Tab, label: "Отклики", icon: Users },
  { id: "search" as Tab, label: "Поиск кандидатов", icon: Search },
  { id: "settings" as Tab, label: "Настройки", icon: Settings },
];

const stats = [
  { value: 3, label: "Активных вакансий", icon: Briefcase, trend: "+1" },
  { value: 12, label: "Новых откликов", icon: Users, trend: "+5" },
  { value: 248, label: "Просмотров вакансий", icon: LayoutDashboard, trend: "+20%" },
  { value: 7, label: "В избранном", icon: Briefcase, trend: "" },
];

const responsesData = [
  {
    id: 1,
    candidate: "Анна К.",
    vacancy: "Официант — Ресторан «Панорама»",
    date: "15.03.2025",
    status: "pending",
  },
  {
    id: 2,
    candidate: "Игорь П.",
    vacancy: "Официант — Ресторан «Панорама»",
    date: "14.03.2025",
    status: "pending",
  },
  {
    id: 3,
    candidate: "Елена С.",
    vacancy: "Хостес — Банкетный зал",
    date: "13.03.2025",
    status: "accepted",
  },
];

export default function EmployerDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [responseStatuses, setResponseStatuses] = useState<
    Record<number, "pending" | "accepted" | "rejected">
  >(
    Object.fromEntries(
      responsesData.map((r) => [r.id, r.status as "pending" | "accepted"])
    )
  );

  const setStatus = (id: number, status: "accepted" | "rejected") => {
    setResponseStatuses((prev) => ({ ...prev, [id]: status }));
  };

  return (
    <div className="px-6 md:px-12 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-medium text-ink mb-8">
          Личный кабинет работодателя
        </h1>
        <div className="flex gap-8">
      <aside className="w-60 shrink-0 sticky top-24 self-start">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Avatar name="Ресторан «Панорама»" size="xl" />
          <div className="text-center">
            <p className="font-medium text-ink">Ресторан «Панорама»</p>
            <p className="text-sm text-ink/60">Работодатель</p>
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
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <Card key={i} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-2">
                      <stat.icon className="h-8 w-8 text-emerald/60" />
                      {stat.trend && (
                        <span className="text-sm text-green-600 flex items-center">
                          <TrendingUp className="h-4 w-4" />
                          {stat.trend}
                        </span>
                      )}
                    </div>
                    <p className="text-3xl font-light text-emerald mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-ink/70">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <h2 className="font-medium text-ink mb-4">Последние отклики</h2>
              <div className="space-y-4">
                {responsesData.slice(0, 3).map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between py-4 border-b border-mist last:border-0"
                  >
                    <div>
                      <p className="font-medium text-ink">{r.candidate}</p>
                      <p className="text-sm text-ink/70">{r.vacancy}</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Смотреть
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-4">
                Смотреть все
              </Button>
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                variant="primary"
                className="gap-2"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="h-4 w-4" />
                Создать вакансию
              </Button>
            </div>
            <div className="space-y-4">
              {jobs.slice(0, 4).map((job) => (
                <Card key={job.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-ink">{job.role}</h3>
                      <p className="text-sm text-ink/60">
                        {job.company} • {job.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="available">Активна</Badge>
                      <span className="text-sm text-ink/60">5 откликов</span>
                      <Button variant="ghost" size="sm">
                        Редактировать
                      </Button>
                      <Button variant="ghost" size="sm" className="text-ink/60">
                        Закрыть вакансию
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
                        Кандидат
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-ink">
                        Вакансия
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-ink">
                        Дата
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-ink">
                        Статус
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-ink">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {responsesData.map((r) => (
                      <tr
                        key={r.id}
                        className="border-b border-mist last:border-0"
                      >
                        <td className="py-4 px-6 text-ink">{r.candidate}</td>
                        <td className="py-4 px-6 text-ink/70">{r.vacancy}</td>
                        <td className="py-4 px-6 text-ink/70">{r.date}</td>
                        <td className="py-4 px-6">
                          <Badge
                            variant={
                              responseStatuses[r.id] === "accepted"
                                ? "available"
                                : responseStatuses[r.id] === "rejected"
                                ? "default"
                                : "pending"
                            }
                          >
                            {responseStatuses[r.id] === "accepted"
                              ? "Принят"
                              : responseStatuses[r.id] === "rejected"
                              ? "Отклонён"
                              : "На рассмотрении"}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 flex gap-2">
                          {responseStatuses[r.id] === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600"
                                onClick={() => setStatus(r.id, "accepted")}
                              >
                                Принять
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-ink/60"
                                onClick={() => setStatus(r.id, "rejected")}
                              >
                                Отклонить
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "search" && (
          <Card className="p-8">
            <CardContent className="p-0 text-center">
              <p className="text-ink mb-4">Поиск кандидатов в каталоге</p>
              <Link href="/candidates">
                <Button variant="primary">Перейти в каталог кандидатов</Button>
              </Link>
            </CardContent>
          </Card>
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

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-2xl font-medium text-ink mb-6">
              Создать вакансию
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Роль
                </label>
                <select className="w-full h-11 rounded-lg border border-mist px-4">
                  <option>Официант</option>
                  <option>Бармен</option>
                  <option>Хостес</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Формат
                </label>
                <select className="w-full h-11 rounded-lg border border-mist px-4">
                  <option>Разовый</option>
                  <option>Постоянный</option>
                  <option>Проектный</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Описание
                </label>
                <textarea
                  className="w-full min-h-[100px] rounded-lg border border-mist px-4 py-3"
                  placeholder="Опишите вакансию..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Требования
                </label>
                <textarea
                  className="w-full min-h-[80px] rounded-lg border border-mist px-4 py-3"
                  placeholder="Опыт, навыки..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Дата
                </label>
                <input
                  type="text"
                  className="w-full h-11 rounded-lg border border-mist px-4"
                  placeholder="25 марта 2025"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Адрес
                </label>
                <input
                  type="text"
                  className="w-full h-11 rounded-lg border border-mist px-4"
                  placeholder="Город или регион"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Опубликовать
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowCreateModal(false)}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
