# EventStaff — Демо биржи труда для event-персонала

Визуальное MVP платформы для поиска персонала и работы в ресторанной и event-индустрии.

## Стек

- Next.js 14 (App Router)
- Tailwind CSS
- Lucide React
- Статичные заглушки (без API и backend)

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Страницы

| Маршрут | Описание |
|---------|----------|
| `/` | Главная |
| `/onboarding` | Вступление и воронка выбора роли |
| `/jobs` | Каталог вакансий |
| `/jobs/[id]` | Карточка вакансии |
| `/candidates` | Каталог кандидатов |
| `/candidates/[id]` | Карточка кандидата |
| `/dashboard/candidate` | ЛК соискателя |
| `/dashboard/employer` | ЛК работодателя |
| `/feedback` | Обратная связь |

## Палитра

- **emerald** `#1D4E3F` — основной бренд
- **mocha** `#6B4F3A` — акцент для работодателей
- **stone** `#F5F3EF` — фоновый
- **ink** `#1C1C1C` — текст
- **mist** `#E8E5E0` — разделители
