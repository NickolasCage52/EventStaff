# Технический аудит EventStaff — 2026-05-06

## Примечание по PRD

В репозитории отсутствует файл **`PRD.md`** (ни в корне, ни в `docs/`). Ориентиры: **`README.md`**, **`packages/api/prisma/schema.prisma`**, **`BACKLOG.md`**.

## Поднятие проекта (среда агента)

- **pnpm install**, **pnpm typecheck**, **pnpm build** — выполнены успешно.
- **Docker Desktop** в сессии недоступен (pipe `dockerDesktopLinuxEngine`); **Postgres/Redis локально не подняты**, сиды/E2E по UI не гонялись.
- Рекомендуемые команды на машине разработчика: `pnpm docker:db` или `pnpm docker:up`, затем `pnpm db:migrate`, `pnpm db:seed`, `pnpm dev:all`.
- **`packages/web/.env.local`** (gitignored): пример добавлен через `packages/web/env.docker.local.example`; **JWT синхронно с корневым `.env`**; для сокета — **`NEXT_PUBLIC_WS_URL`** (учтено в `getApiOriginForSocket`).
- Корневой `.env` из `.env.example` — dev-секреты; реальные YooKassa/S3/Resend не требовались для фиксов.

## Архитектура (кратко)

- **Монорепо**: `@unity/web` (Next 14), `@unity/api` (Fastify + Prisma + Socket.io на том же процессе), `@unity/shared`.
- **Чат**: модель **`ChatRoom` / `ChatMessage`**, REST `GET /api/v1/chat/rooms`, сокеты namespace **`/chat`**, путь `/socket.io/`.
- Легаси: **`Conversation` / `Message`**, REST `/api/v1/messages/conversations` — не связаны с ChatRoom и сокетами.

## Найденные проблемы

### Критичные

1. **Чат без сокета в кабинетах `/worker/*` и `/employer/*`**  
   `ChatInboxProvider` был только в `app/dashboard/layout.tsx`. Сервер сообщений живёт под worker/employer → сокет **не создавался**, real-time не работал.

2. **Неверная связка UI чата и моделей БД**  
   Список и комната использовали **`/messages/conversations`** и id **Conversation**, тогда как «Написать» создавал **ChatRoom**. Редирект с `/dashboard/chat/[roomId]` вел на `/worker/messages/[chatRoomId]`, где запрашивался **conversation** → 404 / пустые данные.

3. **`ChatRoomView` и маршрут `[id]`**  
   Компонент читал только `params.roomId`, игнорируя `params.id` для `/worker/messages/[id]` и `/employer/messages/[id]`.

4. **Открытие чата из списка откликов работодателя**  
   В `VacancyApplicationsPageClient`: форма ответа API `{ data: { room: { id } } }` трактовалась как `data.id`; в `recipientId` передавался **`worker.profile.id`** вместо **`userId`** (`POST /chat/rooms` ожидает user id по `resolveChatPair`).

### Средние

5. **`NEXT_PUBLIC_WS_URL` не использовался** при сборке origin для Socket.io клиента.

6. **`generateStaticParams` с placeholder** для страниц сообщений ограничивал статическую матрицу маршрутов (удалены).

### Мелкие

7. README вводил в заблуждение: только `pnpm dev` без упоминания `.env.local` и `pnpm dev:all`.

## Что исправлено

- Обернуты **`(worker)/layout.tsx`** и **`(employer)/layout.tsx`** в **`ChatInboxProvider`** — сокет и счётчик непрочитанных доступны во всех кабинетах.
- Списки **«Сообщения»**: переведены на **`GET /chat/rooms`**, переход на комнату по **ChatRoom id**.
- Комната: переиспользован **`ChatRoomView`** под `[id]`; поддержка **`roomId | id`**; «Назад» в **`/worker/messages`** / **`/employer/messages`**.
- **OpenChatButton**: переход напряжно по роли, без цикла через `/dashboard/chat`.
- **VacancyApplicationsPageClient**: `recipientId = worker.userId`, парсинг `data.room.id`, `router.push('/employer/messages/…')`; кнопка чата для статусов, разрешённых контекстом чата (**invited, interview, confirmed, …**).
- **`getApiOriginForSocket`**: учёт **`NEXT_PUBLIC_WS_URL`**.
- **README**, **env.docker.local.example**, этот файл.

## Повторная проверка

- **pnpm typecheck** — OK  
- **pnpm build** — OK (eslint warnings в других файлах сохранены)

## Оставшиеся блокеры полного E2E

- Docker / Postgres / Redis на CI-агента.
- Отсутствие **PRD.md** для строгой сверки сценариев.

## Git

**Ветка:** `fix/full-audit-and-stabilization`

**Целевой remote:** см. ниже после выполнения `git remote add target …` и `git push`.

**Push в `NickolasCage52/EventStaff`:** выполнить вручную при наличии credentials (PAT/SSH и прав записи):

```bash
git remote add target https://github.com/NickolasCage52/EventStaff
git checkout -b fix/full-audit-and-stabilization
git push -u target HEAD
```
