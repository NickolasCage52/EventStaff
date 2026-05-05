# BACKLOG — Технический долг (отложено)

Этот файл содержит функции и задачи, которые намеренно отложены и
**не являются техническим долгом текущего релиза**.
При подготовке следующей мажорной версии — пересмотреть каждый пункт.

---

## WorkerAvailability + Booking Integration

Текущий статус: расписание доступности работника сохраняется независимо.
Требуется интеграция с `Booking` / `Application`, чтобы при бронировании
автоматически блокировать слоты в `WorkerAvailability`.

Файлы:
- `packages/api/src/routes/worker/index.ts` — endpoint `PUT /availability`

---

## FeatureFlag Model

В Prisma-схеме присутствует модель `FeatureFlag`, которая не используется
в application-коде. Может быть удалена в следующей мажорной версии
или задействована для A/B-тестирования.

Файлы:
- `packages/api/prisma/schema.prisma` — model FeatureFlag

---

## VacancyTemplate Endpoints

Модель `VacancyTemplate` в схеме есть, но CRUD-роутов нет.
Запланировано для функции «Шаблоны вакансий» у работодателей.

---

## SEO Meta Tags для публичных страниц

Страницы `/workers`, `/vacancies`, `/workers/:id` не имеют
динамических `<meta>` тегов для SEO (OG, description, canonical).
Требуется реализация через `generateMetadata()` в Next.js 14.

---

## Push-уведомления

Канал `PushSubscription` в Prisma-схеме готов.
Web Push API (VAPID) не реализован.
Требуется: VAPID-ключи, endpoint для подписки, `web-push` пакет.

---

## Telegram-уведомления

Webhook для Telegram Bot не реализован.
Готово: поле `telegramId` в `NotificationPreferences`.
Требуется: `node-telegram-bot-api`, настройка webhook.

---

## Subscription Model для работодателей

`SubscriptionPlan` и `EmployerSubscription` в схеме готовы.
Логика тарификации, ограничений по плану и биллинг — не реализованы.

---

## OTP / Phone Verification

`generateOtp()` в shared/utils.ts реализован, но эндпоинт верификации
телефона через SMS-шлюз отсутствует.
Требуется: выбор SMS-провайдера (SMSC, SMS.ru и т.п.), endpoint `POST /auth/verify-phone`.
