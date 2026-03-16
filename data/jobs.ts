export interface Job {
  id: string;
  role: string;
  category: string;
  company: string;
  format: "разовый" | "постоянный" | "проектный";
  urgent: boolean;
  date: string;
  experience: "any" | "1year" | "3years";
  description: string;
  requirements: string[];
  conditions: string;
}

export const jobs: Job[] = [
  {
    id: "1",
    role: "Официант",
    category: "Официант",
    company: "Ресторан «Панорама»",
    format: "разовый",
    urgent: true,
    date: "25 марта 2025",
    experience: "1year",
    description:
      "Требуется опытный официант для обслуживания банкета на 80 человек. Работа в престижном ресторане, высокие стандарты сервиса.",
    requirements: [
      "Опыт работы от 1 года",
      "Возраст 18+",
      "Аккуратный внешний вид",
      "Умение работать в команде",
    ],
    conditions: "Ставка от 1 500 ₽/смена. Адрес: ул. Примерная, 1.",
  },
  {
    id: "2",
    role: "Бармен",
    category: "Бармен",
    company: "Кейтеринг «Праздник»",
    format: "разовый",
    urgent: false,
    date: "28 марта 2025",
    experience: "1year",
    description:
      "Бармен для кейтерингового мероприятия. Знание коктейльной карты, скорость работы.",
    requirements: ["Опыт от 1 года", "Знание коктейлей", "Пунктуальность"],
    conditions: "По договорённости. Работа по всей России.",
  },
  {
    id: "3",
    role: "Хостес",
    category: "Хостес",
    company: "Банкетный зал «Морской»",
    format: "постоянный",
    urgent: false,
    date: "с 1 апреля",
    experience: "any",
    description:
      "Приветствие гостей, рассадка, координация с кухней и залом.",
    requirements: ["Приятная внешность", "Коммуникабельность"],
    conditions: "Полная занятость, график 2/2.",
  },
  {
    id: "4",
    role: "Официант-банкетник",
    category: "Официант",
    company: "Wedding Hall",
    format: "разовый",
    urgent: true,
    date: "30 марта 2025",
    experience: "3years",
    description: "Свадебный банкет на 120 гостей. Профессиональный сервис.",
    requirements: ["Опыт от 3 лет", "Опыт банкетов"],
    conditions: "2 000 ₽/смена. Выезд в пригород.",
  },
  {
    id: "5",
    role: "Администратор",
    category: "Администратор",
    company: "Кафе «У моря»",
    format: "постоянный",
    urgent: false,
    date: "с 15 апреля",
    experience: "1year",
    description: "Управление сменой, контроль залов, работа с гостями.",
    requirements: ["Опыт администрирования", "Стрессоустойчивость"],
    conditions: "Оформление по ТК. Оклад + премии.",
  },
  {
    id: "6",
    role: "Повар",
    category: "Повар",
    company: "Студия кулинарии",
    format: "разовый",
    urgent: false,
    date: "5 апреля 2025",
    experience: "3years",
    description: "Кулинарный мастер-класс для 25 человек. Холодные закуски.",
    requirements: ["Опыт от 3 лет", "Санитарная книжка"],
    conditions: "По договорённости.",
  },
  {
    id: "7",
    role: "Координатор",
    category: "Координатор",
    company: "Event-агентство",
    format: "проектный",
    urgent: false,
    date: "с 20 марта",
    experience: "1year",
    description: "Координация персонала на мероприятиях, логистика.",
    requirements: ["Организаторские способности", "Опыт в ивенте"],
    conditions: "Проектная занятость. Гибкий график.",
  },
  {
    id: "8",
    role: "Официант",
    category: "Официант",
    company: "Ресторан «Винодельня»",
    format: "разовый",
    urgent: false,
    date: "12 апреля 2025",
    experience: "1year",
    description: "Дегустация вин, 40 гостей. Знание винной карты приветствуется.",
    requirements: ["Опыт от 1 года", "Базовые знания о вине"],
    conditions: "1 800 ₽/смена.",
  },
  {
    id: "9",
    role: "Кассир",
    category: "Кассир",
    company: "Фуд-корт «Центральный»",
    format: "постоянный",
    urgent: false,
    date: "с 1 апреля",
    experience: "any",
    description: "Работа на кассе, приём платежей, отчётность.",
    requirements: ["Внимательность", "Быстрая обучаемость"],
    conditions: "График 5/2. Оформление.",
  },
  {
    id: "10",
    role: "Бармен",
    category: "Бармен",
    company: "Паб «Английский»",
    format: "разовый",
    urgent: false,
    date: "22 марта 2025",
    experience: "1year",
    description: "Вечер живой музыки. Разливное пиво, простые коктейли.",
    requirements: ["Опыт от 1 года", "Знание пива"],
    conditions: "1 500 ₽/смена.",
  },
];
