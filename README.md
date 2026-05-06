# Юнити — Специализированная биржа event-персонала

Двусторонний marketplace для профессионального event-персонала в ресторанном бизнесе и сфере гостеприимства (HoReCa).

## Стек

| Слой | Технология |
|------|-----------|
| Фронтенд | Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Radix UI |
| Бэкенд | Fastify, TypeScript, Prisma ORM |
| База данных | PostgreSQL 15 |
| Кеш/Очереди | Redis 7, BullMQ |
| Монорепо | pnpm workspaces, Turborepo |

## Быстрый старт

### Требования

- Node.js >= 20
- pnpm >= 9
- Docker & Docker Compose

### Установка

```bash
# 1. Клонировать репозиторий
git clone <repo-url> unity
cd unity

# 2. Скопировать переменные окружения
cp .env.example .env

# Frontend: создать packages/web/.env.local из packages/web/env.docker.local.example —
# там же JWT_SECRET (должен совпадать с корнем) и NEXT_PUBLIC_*.
# Рабочий чат: модель ChatRoom + Socket.io и REST `/api/v1/chat/*` (не путать с legacy `/messages/*`).

# 3. Запустить PostgreSQL и Redis (и API — см. docker-compose.yml)
pnpm docker:up
# или: docker compose -f docker-compose.yml -f docker-compose.local.yml up -d

# 4. Установить зависимости
pnpm install

# 5. Сгенерировать Prisma Client и применить миграции
pnpm db:generate
pnpm db:migrate

# 6. Запустить dev (только фронт: `pnpm dev`; фронт + API: `pnpm dev:all` при БД локально на :4000)
pnpm dev
# или полный стек на хосте:
# pnpm dev:all
```

После запуска:
- **Фронтенд**: http://localhost:3000
- **API**: http://localhost:4000
- **Swagger документация**: http://localhost:4000/docs
- **Adminer (БД)**: http://localhost:8080 — только если подняли с профилем `tools` (см. `scripts/start-docker-stack.ps1`)

## Структура проекта

```
unity/
├── packages/
│   ├── web/          # Next.js фронтенд
│   ├── api/          # Fastify API сервер
│   └── shared/       # Общие типы, схемы, константы
├── docker-compose.yml
├── docker-compose.local.yml   # проброс портов БД/Redis только для разработки на ПК
├── .env.example
├── pnpm-workspace.yaml
└── turbo.json
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `pnpm dev` | Next.js фронтенд только (`packages/web`) |
| `pnpm dev:all` | Фронт + API (Turbo), если API не в Docker |
| `pnpm build` | Собрать все пакеты |
| `pnpm lint` | Линтинг |
| `pnpm typecheck` | Проверка типов |
| `pnpm format` | Форматирование Prettier |
| `pnpm db:generate` | Сгенерировать Prisma Client |
| `pnpm db:migrate` | Применить миграции БД |
| `pnpm db:studio` | Открыть Prisma Studio |

## Переменные окружения

Полный список переменных с описанием — в файле `.env.example`.

Дополнительно для локального UI: файл **`packages/web/.env.local`** (шаблон: `packages/web/env.docker.local.example`). Без него браузер не получит `NEXT_PUBLIC_*`, а **`JWT_SECRET` в `.env.local` должен совпадать с API** — иначе Next.js middleware не расшифрует те же cookie, что выставляет backend.

## Архитектура

### Роли пользователей
- **Работник** — event-персонал (официанты, бармены, повара и т.д.)
- **Работодатель** — рестораны, кейтеринг, event-агентства, частные заказчики
- **Администратор** — модерация, аналитика, CMS
- **Модератор** — модерация контента

### Основные модули
- Аутентификация (Email, телефон+OTP, OAuth)
- Профили и верификация
- Вакансии с модерацией
- Отклики и статусная машина найма
- Бронирование специалистов
- Чат (WebSocket)
- Отзывы и рейтинги
- Биллинг (ЮKassa)
- Админ-панель с CMS

## Публикация на GitHub Pages

Сайт и личный кабинет со статического хостинга работают только вместе с **отдельно развёрнутым API** (Postgres, Redis, HTTPS). Пошагово: [docs/deploy-github-pages.md](docs/deploy-github-pages.md).

## Деплой фронтенда на Vercel

Монорепозиторий: **Root Directory** в Vercel — `packages/web`; установка и сборка — в [packages/web/vercel.json](packages/web/vercel.json) (из корня репо: `pnpm` + `turbo build --filter=@unity/web`).

Переменные: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, **тот же `JWT_SECRET`, что и на API** (см. [docs/deploy-vercel.md](docs/deploy-vercel.md)). Бэкенд (Fastify, Prisma, Socket.io, BullMQ) на Vercel не поднимается — только отдельный хост.

## Лицензия

Proprietary. Все права защищены.
