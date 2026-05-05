/**
 * QA seed — creates deterministic test accounts and fixtures for manual testing.
 * Run:  npx ts-node --project tsconfig.json prisma/seed-qa.ts
 *   or: pnpm db:seed:qa
 *
 * All user passwords: TestPass123!
 *
 * Accounts created:
 *   worker-active@test.ru   — active, TRUSTED level, 10 shifts
 *   worker-new@test.ru      — new worker, 0 shifts
 *   worker-restricted@test.ru — isRestricted, strikeCount 3
 *   worker-banned@test.ru   — banned
 *   employer-active@test.ru — active, verified, Тест Кейтеринг
 *   employer-new@test.ru    — minimal profile
 *   admin@test.ru           — admin role
 */

import {
  PrismaClient,
  StaffCategory,
  Visibility,
  ApplicationStatus,
  VacancyStatus,
  RateType,
  EmploymentType,
  EventType,
  EmployerType,
  BusinessType,
  WorkerLevel,
  Role,
  ShiftStatus,
  BookingStatus,
  ComplaintType,
  ComplaintStatus,
  ComplaintTargetType,
  IndividualRequestStatus,
  ReliabilityLevel,
} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const ROUNDS = 10;
const PASS = 'TestPass123!';

async function hash(p: string) {
  return bcrypt.hash(p, ROUNDS);
}

/** Return tomorrow's date at noon */
function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(12, 0, 0, 0);
  return d;
}

/** Return a date N days from now */
function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(12, 0, 0, 0);
  return d;
}

/** Return a date N days ago */
function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(12, 0, 0, 0);
  return d;
}

async function main() {
  console.log('🌱 QA Seed — start');

  const pw = await hash(PASS);

  // ─── City ─────────────────────────────────────────────────────────────────
  const city = await prisma.city.upsert({
    where: { slug: 'novorossiysk' },
    create: { name: 'Новороссийск', slug: 'novorossiysk', region: 'Краснодарский край', isActive: true },
    update: {},
  });

  // ─── Admin ────────────────────────────────────────────────────────────────
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@test.ru' },
    create: {
      email: 'admin@test.ru',
      passwordHash: pw,
      activeRole: Role.admin,
      emailVerified: true,
      status: 'active',
      roles: { create: { role: Role.admin } },
    },
    update: { passwordHash: pw, status: 'active' },
  });
  await prisma.notificationPreferences.upsert({
    where: { userId: adminUser.id },
    create: { userId: adminUser.id },
    update: {},
  });
  console.log('✅ admin@test.ru');

  // ─── Employer: active ─────────────────────────────────────────────────────
  const empActiveUser = await prisma.user.upsert({
    where: { email: 'employer-active@test.ru' },
    create: {
      email: 'employer-active@test.ru',
      passwordHash: pw,
      activeRole: Role.employer,
      emailVerified: true,
      status: 'active',
      roles: { create: { role: Role.employer } },
    },
    update: { passwordHash: pw, status: 'active' },
  });
  await prisma.notificationPreferences.upsert({
    where: { userId: empActiveUser.id },
    create: { userId: empActiveUser.id },
    update: {},
  });

  const empActiveProfile = await prisma.employerProfile.upsert({
    where: { userId: empActiveUser.id },
    create: {
      userId: empActiveUser.id,
      slug: 'test-catering-qa',
      type: EmployerType.company,
      companyName: 'Тест Кейтеринг',
      contactName: 'Иван Тестовый',
      description: 'Тестовая организация для QA проверок. Специализируемся на корпоративных мероприятиях.',
      businessType: BusinessType.catering,
      isVerified: true,
      verifiedAt: daysAgo(30),
      cityId: city.id,
    },
    update: { companyName: 'Тест Кейтеринг', isVerified: true },
  });
  console.log('✅ employer-active@test.ru');

  // ─── Employer: new ────────────────────────────────────────────────────────
  const empNewUser = await prisma.user.upsert({
    where: { email: 'employer-new@test.ru' },
    create: {
      email: 'employer-new@test.ru',
      passwordHash: pw,
      activeRole: Role.employer,
      emailVerified: true,
      status: 'active',
      roles: { create: { role: Role.employer } },
    },
    update: { passwordHash: pw, status: 'active' },
  });
  await prisma.notificationPreferences.upsert({
    where: { userId: empNewUser.id },
    create: { userId: empNewUser.id },
    update: {},
  });
  await prisma.employerProfile.upsert({
    where: { userId: empNewUser.id },
    create: {
      userId: empNewUser.id,
      slug: 'employer-new-qa',
      type: EmployerType.individual,
      companyName: 'Новый работодатель QA',
      businessType: BusinessType.other,
    },
    update: {},
  });
  console.log('✅ employer-new@test.ru');

  // ─── Worker: active ───────────────────────────────────────────────────────
  const wkrActiveUser = await prisma.user.upsert({
    where: { email: 'worker-active@test.ru' },
    create: {
      email: 'worker-active@test.ru',
      passwordHash: pw,
      activeRole: Role.worker,
      emailVerified: true,
      status: 'active',
      roles: { create: { role: Role.worker } },
    },
    update: { passwordHash: pw, status: 'active' },
  });
  await prisma.notificationPreferences.upsert({
    where: { userId: wkrActiveUser.id },
    create: { userId: wkrActiveUser.id },
    update: {},
  });

  const wkrActiveProfile = await prisma.workerProfile.upsert({
    where: { userId: wkrActiveUser.id },
    create: {
      userId: wkrActiveUser.id,
      slug: 'worker-active-qa',
      firstName: 'Алексей',
      lastName: 'Активный',
      age: 28,
      cityId: city.id,
      bio: 'Опытный официант с 5-летним стажем. Работаю на корпоративах и свадьбах. Ответственный, пунктуальный.',
      experienceYears: 5,
      desiredRate: 1500,
      rateType: RateType.per_shift,
      willingToTravel: true,
      overtimeReady: true,
      visibility: Visibility.public,
      isVerified: true,
      verifiedAt: daysAgo(60),
      ratingScore: 4.8,
      totalReviews: 8,
      totalShifts: 10,
      languages: ['ru', 'en'],
    },
    update: {
      firstName: 'Алексей',
      lastName: 'Активный',
      totalShifts: 10,
      ratingScore: 4.8,
    },
  });

  // Worker categories
  await prisma.workerCategory.upsert({
    where: { workerId_category: { workerId: wkrActiveProfile.id, category: StaffCategory.waiter } },
    create: { workerId: wkrActiveProfile.id, category: StaffCategory.waiter, level: WorkerLevel.expert },
    update: { level: WorkerLevel.expert },
  });
  await prisma.workerCategory.upsert({
    where: { workerId_category: { workerId: wkrActiveProfile.id, category: StaffCategory.bartender } },
    create: { workerId: wkrActiveProfile.id, category: StaffCategory.bartender, level: WorkerLevel.experienced },
    update: {},
  });

  // Reliability score
  await prisma.userReliabilityScore.upsert({
    where: { userId: wkrActiveUser.id },
    create: {
      userId: wkrActiveUser.id,
      totalShifts: 10,
      successfulShifts: 10,
      failedShifts: 0,
      cancelledShifts: 0,
      score: 85,
      level: ReliabilityLevel.TRUSTED,
      isRestricted: false,
      strikeCount: 0,
    },
    update: { score: 85, level: ReliabilityLevel.TRUSTED, totalShifts: 10, successfulShifts: 10 },
  });
  console.log('✅ worker-active@test.ru');

  // ─── Worker: new ─────────────────────────────────────────────────────────
  const wkrNewUser = await prisma.user.upsert({
    where: { email: 'worker-new@test.ru' },
    create: {
      email: 'worker-new@test.ru',
      passwordHash: pw,
      activeRole: Role.worker,
      emailVerified: true,
      status: 'active',
      roles: { create: { role: Role.worker } },
    },
    update: { passwordHash: pw, status: 'active' },
  });
  await prisma.notificationPreferences.upsert({
    where: { userId: wkrNewUser.id },
    create: { userId: wkrNewUser.id },
    update: {},
  });

  const wkrNewProfile = await prisma.workerProfile.upsert({
    where: { userId: wkrNewUser.id },
    create: {
      userId: wkrNewUser.id,
      slug: 'worker-new-qa',
      firstName: 'Новый',
      lastName: 'Работник',
      age: 22,
      cityId: city.id,
      visibility: Visibility.public,
    },
    update: { firstName: 'Новый', lastName: 'Работник' },
  });

  await prisma.userReliabilityScore.upsert({
    where: { userId: wkrNewUser.id },
    create: {
      userId: wkrNewUser.id,
      totalShifts: 0,
      successfulShifts: 0,
      failedShifts: 0,
      cancelledShifts: 0,
      score: 100,
      level: ReliabilityLevel.NEW,
      isRestricted: false,
      strikeCount: 0,
    },
    update: {},
  });
  console.log('✅ worker-new@test.ru');

  // ─── Worker: restricted ───────────────────────────────────────────────────
  const wkrRestrictedUser = await prisma.user.upsert({
    where: { email: 'worker-restricted@test.ru' },
    create: {
      email: 'worker-restricted@test.ru',
      passwordHash: pw,
      activeRole: Role.worker,
      emailVerified: true,
      status: 'restricted',
      roles: { create: { role: Role.worker } },
    },
    update: { passwordHash: pw, status: 'restricted' },
  });
  await prisma.notificationPreferences.upsert({
    where: { userId: wkrRestrictedUser.id },
    create: { userId: wkrRestrictedUser.id },
    update: {},
  });

  const wkrRestrictedProfile = await prisma.workerProfile.upsert({
    where: { userId: wkrRestrictedUser.id },
    create: {
      userId: wkrRestrictedUser.id,
      slug: 'worker-restricted-qa',
      firstName: 'Ограниченный',
      lastName: 'Работник',
      age: 25,
      cityId: city.id,
      visibility: Visibility.public,
    },
    update: { firstName: 'Ограниченный', lastName: 'Работник' },
  });

  await prisma.userReliabilityScore.upsert({
    where: { userId: wkrRestrictedUser.id },
    create: {
      userId: wkrRestrictedUser.id,
      totalShifts: 5,
      successfulShifts: 2,
      failedShifts: 3,
      cancelledShifts: 0,
      score: 40,
      level: ReliabilityLevel.RESTRICTED,
      isRestricted: true,
      strikeCount: 3,
      restrictedAt: daysAgo(5),
      restrictedReason: 'Три сорванных смены подряд',
    },
    update: { isRestricted: true, strikeCount: 3, score: 40, level: ReliabilityLevel.RESTRICTED },
  });
  console.log('✅ worker-restricted@test.ru');

  // ─── Worker: banned ───────────────────────────────────────────────────────
  const wkrBannedUser = await prisma.user.upsert({
    where: { email: 'worker-banned@test.ru' },
    create: {
      email: 'worker-banned@test.ru',
      passwordHash: pw,
      activeRole: Role.worker,
      emailVerified: true,
      status: 'banned',
      roles: { create: { role: Role.worker } },
    },
    update: { passwordHash: pw, status: 'banned' },
  });
  await prisma.notificationPreferences.upsert({
    where: { userId: wkrBannedUser.id },
    create: { userId: wkrBannedUser.id },
    update: {},
  });
  await prisma.workerProfile.upsert({
    where: { userId: wkrBannedUser.id },
    create: {
      userId: wkrBannedUser.id,
      slug: 'worker-banned-qa',
      firstName: 'Заблокированный',
      lastName: 'Работник',
      age: 30,
      cityId: city.id,
      visibility: Visibility.hidden,
    },
    update: { firstName: 'Заблокированный', lastName: 'Работник' },
  });
  console.log('✅ worker-banned@test.ru');

  // ─── Vacancies ────────────────────────────────────────────────────────────
  const vacancy1 = await prisma.vacancy.upsert({
    where: {
      id: 'qa-vacancy-001',
    } as { id: string },
    create: {
      id: 'qa-vacancy-001',
      employerId: empActiveProfile.id,
      cityId: city.id,
      title: 'Официант на корпоратив',
      category: StaffCategory.waiter,
      eventType: EventType.corporate,
      rate: 1500,
      rateType: RateType.per_shift,
      employmentType: EmploymentType.single_shift,
      dateStart: tomorrow(),
      timeStart: '18:00',
      timeEnd: '23:00',
      address: 'ул. Ленина, 1, Новороссийск',
      workersNeeded: 3,
      dressCode: 'Белая рубашка, чёрные брюки',
      description: 'Обслуживание корпоративного мероприятия на 50 персон.',
      status: VacancyStatus.active,
      publishedAt: daysAgo(2),
    },
    update: { status: VacancyStatus.active, dateStart: tomorrow() },
  });

  const vacancy2 = await prisma.vacancy.upsert({
    where: { id: 'qa-vacancy-002' } as { id: string },
    create: {
      id: 'qa-vacancy-002',
      employerId: empActiveProfile.id,
      cityId: city.id,
      title: 'Бармен на свадьбу',
      category: StaffCategory.bartender,
      eventType: EventType.wedding,
      rate: 2000,
      rateType: RateType.per_shift,
      employmentType: EmploymentType.single_shift,
      dateStart: daysFromNow(5),
      timeStart: '16:00',
      timeEnd: '00:00',
      address: 'Банкетный зал «Причал», Новороссийск',
      workersNeeded: 2,
      description: 'Работа за баром на свадьбе. Опыт обязателен.',
      status: VacancyStatus.active,
      publishedAt: daysAgo(1),
    },
    update: { status: VacancyStatus.active, dateStart: daysFromNow(5) },
  });

  const vacancy3 = await prisma.vacancy.upsert({
    where: { id: 'qa-vacancy-003' } as { id: string },
    create: {
      id: 'qa-vacancy-003',
      employerId: empActiveProfile.id,
      cityId: city.id,
      title: 'Хостес',
      category: StaffCategory.hostess,
      eventType: EventType.conference,
      rate: 1200,
      rateType: RateType.per_shift,
      employmentType: EmploymentType.single_shift,
      dateStart: daysAgo(10),
      workersNeeded: 1,
      description: 'Архивная вакансия.',
      status: VacancyStatus.archived,
    },
    update: { status: VacancyStatus.archived },
  });

  console.log('✅ Vacancies: 3 created');

  // ─── Application: worker-active → vacancy1 (ACCEPTED/CONFIRMED) ───────────
  const app1 = await prisma.application.upsert({
    where: { vacancyId_workerId: { vacancyId: vacancy1.id, workerId: wkrActiveProfile.id } },
    create: {
      vacancyId: vacancy1.id,
      workerId: wkrActiveProfile.id,
      coverMessage: 'Готов выйти, опыт 5 лет.',
      status: ApplicationStatus.confirmed,
    },
    update: { status: ApplicationStatus.confirmed },
  });

  // ─── Application: worker-new → vacancy2 (PENDING) ─────────────────────────
  const app2 = await prisma.application.upsert({
    where: { vacancyId_workerId: { vacancyId: vacancy2.id, workerId: wkrNewProfile.id } },
    create: {
      vacancyId: vacancy2.id,
      workerId: wkrNewProfile.id,
      coverMessage: 'Хочу попробовать свои силы.',
      status: ApplicationStatus.pending,
    },
    update: { status: ApplicationStatus.pending },
  });

  // ─── Invitation: employer-active → worker-new on vacancy2 (INVITED status) ─
  // An invitation is represented as an Application with status=invited,
  // created by the employer rather than the worker.
  // We reuse app2 — just note: for demonstration this is shown in
  // worker-new's invitations tab as a pending application from the employer.

  console.log('✅ Applications: 2 created');

  // ─── Bookings & Shifts ────────────────────────────────────────────────────
  // Booking 1 — worker-active + employer-active + vacancy1 (for ACTIVE shift)
  const booking1 = await prisma.booking.upsert({
    where: { id: 'qa-booking-001' } as { id: string },
    create: {
      id: 'qa-booking-001',
      employerId: empActiveProfile.id,
      workerId: wkrActiveProfile.id,
      linkedVacancyId: vacancy1.id,
      date: tomorrow(),
      timeStart: '18:00',
      timeEnd: '23:00',
      location: 'ул. Ленина, 1, Новороссийск',
      rate: 1500,
      status: BookingStatus.confirmed,
    },
    update: { status: BookingStatus.confirmed, date: tomorrow() },
  });

  // Booking 2 — for COMPLETED shift
  const booking2 = await prisma.booking.upsert({
    where: { id: 'qa-booking-002' } as { id: string },
    create: {
      id: 'qa-booking-002',
      employerId: empActiveProfile.id,
      workerId: wkrActiveProfile.id,
      date: daysAgo(3),
      timeStart: '14:00',
      timeEnd: '20:00',
      location: 'Банкетный зал, Новороссийск',
      rate: 1800,
      status: BookingStatus.completed,
    },
    update: { status: BookingStatus.completed },
  });

  // Booking 3 — for DISPUTED shift
  const booking3 = await prisma.booking.upsert({
    where: { id: 'qa-booking-003' } as { id: string },
    create: {
      id: 'qa-booking-003',
      employerId: empActiveProfile.id,
      workerId: wkrActiveProfile.id,
      date: daysAgo(7),
      location: 'Ресторан «Якорь», Новороссийск',
      rate: 2000,
      status: BookingStatus.cancelled,
    },
    update: { status: BookingStatus.cancelled },
  });

  // Shift 1: ACTIVE — both not confirmed
  const shift1 = await prisma.shift.upsert({
    where: { bookingId_workerId: { bookingId: booking1.id, workerId: wkrActiveUser.id } },
    create: {
      bookingId: booking1.id,
      workerId: wkrActiveUser.id,
      employerId: empActiveUser.id,
      status: ShiftStatus.ACTIVE,
      workerConfirmed: false,
      employerConfirmed: false,
    },
    update: { status: ShiftStatus.ACTIVE, workerConfirmed: false, employerConfirmed: false },
  });

  // Shift 2: COMPLETED — both confirmed, awaiting payment
  const shift2 = await prisma.shift.upsert({
    where: { bookingId_workerId: { bookingId: booking2.id, workerId: wkrActiveUser.id } },
    create: {
      bookingId: booking2.id,
      workerId: wkrActiveUser.id,
      employerId: empActiveUser.id,
      status: ShiftStatus.COMPLETED,
      workerConfirmed: true,
      employerConfirmed: true,
      workerConfirmedAt: daysAgo(3),
      employerConfirmedAt: daysAgo(3),
      completedAt: daysAgo(3),
    },
    update: { status: ShiftStatus.COMPLETED, workerConfirmed: true, employerConfirmed: true },
  });

  // Shift 3: DISPUTED
  const shift3 = await prisma.shift.upsert({
    where: { bookingId_workerId: { bookingId: booking3.id, workerId: wkrActiveUser.id } },
    create: {
      bookingId: booking3.id,
      workerId: wkrActiveUser.id,
      employerId: empActiveUser.id,
      status: ShiftStatus.DISPUTED,
      workerConfirmed: true,
      employerConfirmed: false,
      workerConfirmedAt: daysAgo(7),
    },
    update: { status: ShiftStatus.DISPUTED },
  });

  console.log('✅ Bookings + Shifts: 3 created (ACTIVE, COMPLETED, DISPUTED)');

  // ─── Complaint ────────────────────────────────────────────────────────────
  const complaint = await prisma.complaint.upsert({
    where: { id: 'qa-complaint-001' } as { id: string },
    create: {
      id: 'qa-complaint-001',
      type: ComplaintType.NON_PAYMENT,
      status: ComplaintStatus.NEW,
      authorId: wkrNewUser.id,
      targetId: empActiveUser.id,
      targetType: ComplaintTargetType.USER,
      description: 'Работодатель не оплатил смену 3 дня назад. Смена отработана полностью. Прошу разобраться.',
    },
    update: { status: ComplaintStatus.NEW },
  });
  console.log('✅ Complaint: created');

  // ─── Chat Room ────────────────────────────────────────────────────────────
  const chatRoom = await prisma.chatRoom.upsert({
    where: { workerId_employerId: { workerId: wkrActiveProfile.id, employerId: empActiveProfile.id } },
    create: {
      workerId: wkrActiveProfile.id,
      employerId: empActiveProfile.id,
      orderId: booking1.id,
    },
    update: {},
  });

  // Messages in chat room
  const existingMessages = await prisma.chatMessage.count({ where: { roomId: chatRoom.id } });
  if (existingMessages === 0) {
    await prisma.chatMessage.createMany({
      data: [
        {
          roomId: chatRoom.id,
          senderId: wkrActiveUser.id,
          text: 'Добрый день! Подтверждаю участие в смене завтра. Во сколько лучше подъехать?',
          isRead: true,
          readAt: daysAgo(1),
          createdAt: daysAgo(1),
        },
        {
          roomId: chatRoom.id,
          senderId: empActiveUser.id,
          text: 'Добрый день! Подъезжайте к 17:30, чтобы успеть переодеться и пройти инструктаж.',
          isRead: true,
          readAt: daysAgo(1),
          createdAt: daysAgo(1),
        },
        {
          roomId: chatRoom.id,
          senderId: wkrActiveUser.id,
          text: 'Понял, буду вовремя! Есть ли форменная одежда или приходить в своей?',
          isRead: false,
          createdAt: new Date(),
        },
      ],
    });
  }
  console.log('✅ Chat Room + 3 messages');

  // ─── Individual Request ───────────────────────────────────────────────────
  const indReq = await prisma.individualRequest.upsert({
    where: { id: 'qa-ind-req-001' } as { id: string },
    create: {
      id: 'qa-ind-req-001',
      role: Role.employer,
      name: 'Иван Тестовый',
      phone: '+79001234567',
      email: 'employer-active@test.ru',
      company: 'Тест Кейтеринг',
      eventType: 'corporate',
      eventDate: daysFromNow(30),
      staffNeeded: 'Официанты, бармены',
      quantity: 10,
      message: 'Нам нужна команда для корпоратива на 200 человек. Пожалуйста, свяжитесь для уточнения деталей.',
      status: IndividualRequestStatus.NEW,
    },
    update: { status: IndividualRequestStatus.NEW },
  });
  console.log('✅ Individual Request: created');

  // ─── Admin Audit Log (for ban flow demonstration) ─────────────────────────
  // This shows a historical ban/unban action
  await prisma.adminAuditLog.upsert({
    where: { id: 'qa-audit-001' } as { id: string },
    create: {
      id: 'qa-audit-001',
      adminId: adminUser.id,
      action: 'user.ban',
      entityType: 'User',
      entityId: wkrBannedUser.id,
      details: { reason: 'Систематические нарушения правил платформы. Жалобы от работодателей.' },
      ip: '127.0.0.1',
    },
    update: {},
  });
  console.log('✅ Admin Audit Log: 1 entry');

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log('\n✅ QA Seed завершён успешно!');
  console.log('\n📋 Тестовые аккаунты (пароль: TestPass123!):');
  console.log('  👤 admin@test.ru            — Администратор');
  console.log('  🏢 employer-active@test.ru  — Работодатель, верифицирован, Тест Кейтеринг');
  console.log('  🏢 employer-new@test.ru     — Работодатель, минимальный профиль');
  console.log('  👷 worker-active@test.ru    — Работник, TRUSTED, 10 смен');
  console.log('  👷 worker-new@test.ru       — Новый работник, 0 смен');
  console.log('  ⚠️  worker-restricted@test.ru — Ограниченный, 3 страйка');
  console.log('  🚫 worker-banned@test.ru    — Заблокирован');
  console.log('\n🧪 Тестовые данные:');
  console.log('  📋 3 вакансии (2 активных, 1 архивная)');
  console.log('  📝 2 отклика (confirmed, pending)');
  console.log('  🔄 3 смены (ACTIVE, COMPLETED, DISPUTED)');
  console.log('  ⚖️  1 жалоба (NON_PAYMENT, NEW)');
  console.log('  💬 1 чат с 3 сообщениями');
  console.log('  📩 1 индивидуальная заявка');
  console.log('  📜 1 запись в AdminAuditLog');
}

main()
  .catch((e) => {
    console.error('❌ QA Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
